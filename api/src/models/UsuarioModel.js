
import bycrypt from 'bcryptjs';
import pool from "../database/data.js";

export const cadastrar = async (usuario, cx = null) => {    
    let cxLocal = cx;
    if (!cxLocal) {
        // Obter uma conexão do pool se não foi fornecida (se é null)
        cxLocal = await pool.getConnection(); 
    }

    try {
        // Desestruturar o objeto usuario
        const { nome, email, senha, tipo_usuario, data_criacao} = usuario; 

        const usuarioExistente = await consultarPorEmail(email, cxLocal);

        if (usuarioExistente) {
            throw new Error("Email já cadastrado");
        }

        // Hash da senha
        const salt = bycrypt.genSaltSync(10);
        const hashSenha = bycrypt.hashSync(senha, salt);

        // Query para inserir um novo usuário
        const query = `INSERT INTO Usuario (nome, email, senha, tipo_usuario, data_criacao) VALUES (?, ?, ?, ?, ?)`;

        // Executar a query com os valores do usuário
        const [result] = await cx.query(query,[nome, email, hashSenha, tipo_usuario, data_criacao]);
    
        // Verificar se a inserção foi bem-sucedida
        if (result.affectedRows === 0) {
            throw new Error("Erro ao cadastrar usuário");
        } 
        // Retornar o ID do usuário inserido
        const usuarioCadastrado = await consultarPorId(result.insertId, cxLocal);
        usuarioCadastrado.senha = undefined;
        return usuarioCadastrado;
    } catch (error) {
        // Lançar o erro para ser tratado pelo chamador
        throw error; 
    } finally{
        if (!cx && cxLocal) {
            cxLocal.release(); // Liberar a conexão de volta ao pool
        }
    }
}


export const consultarPorEmail = async (email, cx = null) => {
    let cxLocal = cx;
    if (!cxLocal) {
        // Obter uma conexão do pool se não foi fornecida (se é null)
        cxLocal = await pool.getConnection(); 
    }

    try {
        // Query para consultar o usuário pelo email
        const query = `SELECT * FROM Usuario WHERE email = ?`;

        // Executar a query com o email fornecido
        const [rows] = await cxLocal.query(query, [email]);
        
        // Verificar se algum usuário foi encontrado
        if (rows.length === 0) {
            return null; // Retornar null se nenhum usuário for encontrado
        }
        
        // Retornar o primeiro usuário encontrado
        return rows[0]; 
    } catch (error) {
        // Lançar o erro para ser tratado pelo chamador
        throw error; 
    } finally{
        if (!cx && cxLocal) {
            cxLocal.release(); // Liberar a conexão de volta ao pool
        }
    }
}


export const consultarPorId = async (id, cx=null) => {
    let cxLocal = cx;
    if (!cxLocal) {
        // Obter uma conexão do pool se não foi fornecida (se é null)
        cxLocal = await pool.getConnection(); 
    }

    try {
        // Query para consultar o usuário por id
        const query = `SELECT * FROM Usuario WHERE id = ?`;

        // Executar a query com o email fornecido
        const [rows] = await cxLocal.query(query, [id]);
        
        // Verificar se algum usuário foi encontrado
        if (rows.length === 0) {
            return null; // Retornar null se nenhum usuário for encontrado
        }
        
        // Retornar o primeiro usuário encontrado
        return rows[0]; 
    } catch (error) {
        // Lançar o erro para ser tratado pelo chamador
        throw error; 
    } finally{
        if (!cx && cxLocal) {
            cxLocal.release(); // Liberar a conexão de volta ao pool
        }
    }
}

export const login = async (email, senha) => {

    const cx = await pool.getConnection();
    try {
        const usuario = await consultarPorEmail(email, cx);

        if (!usuario) {
            throw new Error("Usuário ou senhas incorretos");
        }

        const senhaCorreta = bycrypt.compareSync(senha, usuario.senha);
        if (!senhaCorreta) {
            throw new Error("Usuário ou senhas incorretos");
        }

        usuario.senha = undefined;

        return usuario;
    } catch (error) {
        // Lançar o erro para ser tratado pelo chamador
        throw error; 
    } finally {
        if (cx) {
            cx.release(); // Liberar a conexão de volta ao pool
        }
    }
}
