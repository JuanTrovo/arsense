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

        const [result] = await localCx.query(query, values);

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
    
    const query = "SELECT * FROM usuario WHERE email = ?";

    const [rows] = await localCx.query(query, [email]);

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

// Consultar por ID
export const consultarPorId = async (id, cx = null) => {
    let localCx = cx;
    try{
        if (!localCx) {
            localCx = await pool.getConnection();
        }
        
        const query = "SELECT * FROM usuario WHERE id = ?";
        
        const [rows] = await localCx.query(query, [id]);
        
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



// // Consultar todos (com busca opcional)
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

// // Login 
export const login = async (email, senha) => { // Função para efetuar o login do usuário
    const cx = await pool.getConnection(); // controle para saber se a conexão foi criada aqui ou recebida de fora
    try {

        // Busca o usuário pelo e-mail
        const usuario = await consultarPorEmail(email, cx);
        if (!usuario) {
            return null; // Retorna null se o usuário não for encontrado
        }        
        // Compara a senha fornecida com a senha criptografada no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return null; // Retorna null se a senha estiver incorreta
        }
        // Remove a senha do objeto usuário antes de retornar
        
        
        return usuario;
        
    } catch (error) {
        // Lança erro em caso de falha
        throw new Error("Erro ao efetuar login: " + error.message);
    }finally{        
        // Garante que a conexão será liberada de volta ao pool
        if (cx) { // só libera se a conexão foi criada aqui
            cx.release();
        }
        console.log("finalizou login");
    }
};

// // Atualizar usuário
export const alterar = async (id, dadosAtualizados) => {
    const cx = await pool.getConnection();
    try {
        const campos = [];
        const valores = [];

        for (const chave in dadosAtualizados) {
            campos.push(`${chave} = ?`);
            valores.push(dadosAtualizados[chave]);
        }

        if (campos.length === 0) {
            throw new Error("Nenhum dado fornecido para atualização.");
        }

        const query = `UPDATE usuario SET ${campos.join(", ")} WHERE id = ?`;
        valores.push(id);

        const [result] = await cx.query(query, valores);

        if (result.affectedRows === 0) {
            throw new Error("Usuário não encontrado ou nenhum dado alterado.");
        }

        const usuarioAtualizado = await consultarPorId(id, cx);
        return usuarioAtualizado;

    } catch (error) {
        throw new Error("Erro ao atualizar usuário: " + error.message);
    } finally {
        cx.release();
    }
};

// // Deletar usuário
export const deletarPorID = async (id) => {
    const cx = await pool.getConnection();
    try {
        const query = `DELETE FROM usuario WHERE id = ?`;
        const [result] = await cx.query(query, [id]);

        return result;

    } catch (error) {
        throw new Error("Erro ao deletar usuário: " + error.message);
    } finally {
        cx.release();
    }
};
