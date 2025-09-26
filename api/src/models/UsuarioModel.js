import pool from "../database/data.js";

// Cadastrar usuário
export const cadastrar = async (usuario) => {
    const cx = await pool.getConnection();
    try {
        const { nome, email, senha, tipo_usuario, data_criacao } = usuario;

        // Verifica se email já existe
        const [existe] = await cx.query("SELECT * FROM usuario WHERE email = ?", [email]);
        if (existe.length > 0) {
            throw new Error("Email já cadastrado");
        }

        const query = `
            INSERT INTO usuario (nome, email, senha, tipo_usuario, data_criacao) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await cx.query(query, [nome, email, senha, tipo_usuario, data_criacao]);

        return { id: result.insertId, nome, email, tipo_usuario, data_criacao };
    } finally {
        cx.release();
    }
};

// Consultar por Email
export const consultarPorEmail = async (email) => {
    const cx = await pool.getConnection();
    try {
        const [rows] = await cx.query(`SELECT * FROM usuario WHERE email = ?`, [email]);
        return rows.length > 0 ? rows[0] : null;
    } finally {
        cx.release();
    }
};

// Consultar todos (com busca opcional)
export const consultarTodos = async (search) => {
    const cx = await pool.getConnection();
    try {
        let query = `SELECT id, nome, email, tipo_usuario, data_criacao FROM usuario`;
        let params = [];

        if (search) {
            query += ` WHERE nome LIKE ? OR email LIKE ?`;
            params.push(`%${search}%`, `%${search}%`);
        }

        const [rows] = await cx.query(query, params);
        return rows;
    } finally {
        cx.release();
    }
};

// Consultar por ID
export const consultarPorId = async (id) => {
    const cx = await pool.getConnection();
    try {
        const [rows] = await cx.query(`SELECT * FROM usuario WHERE id = ?`, [id]);
        return rows.length > 0 ? rows[0] : null;
    } finally {
        cx.release();
    }
};

// Login simples
export const login = async (email, senha) => {
    const cx = await pool.getConnection();
    try {
        const [rows] = await cx.query(`SELECT * FROM usuario WHERE email = ? AND senha = ?`, [email, senha]);
        return rows.length > 0 ? rows[0] : null;
    } finally {
        cx.release();
    }
};

// Alterar usuário
export const alterar = async (id, dadosAtualizados) => {
    const cx = await pool.getConnection();
    try {
        const { nome, email, senha, tipo_usuario } = dadosAtualizados;

        const query = `
            UPDATE usuario 
            SET nome = ?, email = ?, senha = ?, tipo_usuario = ?
            WHERE id = ?
        `;
        const [result] = await cx.query(query, [nome, email, senha, tipo_usuario, id]);
        return result;
    } finally {
        cx.release();
    }
};

// Deletar usuário
export const deletarPorID = async (id) => {
    const cx = await pool.getConnection();
    try {
        const [result] = await cx.query(`DELETE FROM usuario WHERE id = ?`, [id]);
        return result;
    } finally {
        cx.release();
    }
};
