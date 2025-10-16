import pool from "../database/data.js";
import bcrypt from "bcryptjs";

// Cadastrar usuário
export const cadastrar = async (usuario, cx = null) => {
    let localCx = cx
    try {

        if (!localCx) {
            localCx = await pool.getConnection();
        }

        const { nome, email, senha, tipo_usuario } = usuario;
        
        const query = `
            INSERT INTO usuario (nome, email, senha, tipo_usuario) 
            VALUES (?, ?, ?, ?)
        `;

        const hashSenha = await bcrypt.hash(senha, 10);

        const values = [nome, email, hashSenha, tipo_usuario];
        
        // Verifica se email já existe
        const usuarioExistente = await consultarPorEmail(email, localCx);
        if (usuarioExistente) {
            throw new Error("Email já cadastrado");
        }

        const [result] = await cx.query(query, values);

        if (result.affectedRows === 0) {
            throw new Error("Erro ao cadastrar usuário")
        }

        const lastIdUser = result.insertId;

        const usuarioCadastrado = await consultarPorId(lastIdUser, localCx);
        return usuarioCadastrado;

    } catch (error) {
        throw new Error("Erro ao cadastrar usuário: " + error.message);
    } finally{
        if (!cx && localCx) {
            localCx.release();
        }
    }
};

// Consultar por Email
export const consultarPorEmail = async (email, cx = null) => {
   let localCx = cx;
   try{
    if (!localCx) {
        localCx = await pool.getConnection();
    }
    
    const query = "SELECT * FROM Usarios WHERE email = ?";

    const [rows] = await localCx.execute(query, [email]);

    let usuario = rows[0];

    return usuario;
   } catch(error) {
        throw new Error("Erro ao buscar usuário por email: " + error.message);
   } finally {
    if (!cx && localCx) {
            localCx.release();
        }
   }
};

// // Consultar todos (com busca opcional)
// export const consultarTodos = async (search) => {
//     const cx = await pool.getConnection();
//     try {
//         let query = `SELECT id, nome, email, tipo_usuario, data_criacao FROM usuario`;
//         let params = [];

//         if (search) {
//             query += ` WHERE nome LIKE ? OR email LIKE ?`;
//             params.push(`%${search}%`, `%${search}%`);
//         }

//         const [rows] = await cx.query(query, params);
//         return rows;
//     } finally {
//         cx.release();
//     }
// };

// Consultar por ID
export const consultarPorId = async (id, cx = null) => {
    let localCx = cx;
   try{
    if (!localCx) {
        localCx = await pool.getConnection();
    }
    
    const query = "SELECT * FROM Usarios WHERE id = ?";

    const [rows] = await localCx.execute(query, [id]);

    let usuario = rows[0];

    return usuario;
   } catch(error) {
        throw new Error("Erro ao buscar usuário por id: " + error.message);
   } finally {
    if (!cx && localCx) {
            localCx.release();
        }
   }
};

// // Login simples
// export const login = async (email, senha) => {
//     const cx = await pool.getConnection();
//     try {
//         const [rows] = await cx.query(`SELECT * FROM usuario WHERE email = ? AND senha = ?`, [email, senha]);
//         return rows.length > 0 ? rows[0] : null;
//     } finally {
//         cx.release();
//     }
// };

// // Alterar usuário
// export const alterar = async (id, dadosAtualizados) => {
//     const cx = await pool.getConnection();
//     try {
//         const { nome, email, senha, tipo_usuario } = dadosAtualizados;

//         const query = `
//             UPDATE usuario 
//             SET nome = ?, email = ?, senha = ?, tipo_usuario = ?
//             WHERE id = ?
//         `;
//         const [result] = await cx.query(query, [nome, email, senha, tipo_usuario, id]);
//         return result;
//     } finally {
//         cx.release();
//     }
// };

// // Deletar usuário
// export const deletarPorID = async (id) => {
//     const cx = await pool.getConnection();
//     try {
//         const [result] = await cx.query(`DELETE FROM usuario WHERE id = ?`, [id]);
//         return result;
//     } finally {
//         cx.release();
//     }
// };
