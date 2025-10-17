import * as UsuarioModel from "../models/UsuarioModel.js";
import * as responses from "../utils/responses.js";

// CADASTRAR USUÁRIO
export const cadastrar = async (req, res) => {
    try {
        const usuario = req.body;

        if (!usuario.nome || !usuario.email || !usuario.senha || !usuario.tipo_usuario) {
            return res.status(400).json({
                success: false,
                message: "Nome, e-mail, senha e tipo de usuário são obrigatórios."
            });
        }

        const novoUsuario = await UsuarioModel.cadastrar(req.body);
        delete novoUsuario.senha;


        res.status(201).json({
            success: true,
            message: "Usuário cadastrado com sucesso.",
            id: novoUsuario.id
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao cadastrar usuário.",
            error: error.message
        });
    }
};

// CONSULTAR POR EMAIL
export const consultarPorEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "O e-mail precisa ser informado na query (?email=...)" });
    }

    const usuario = await UsuarioModel.consultarPorEmail(email);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    delete usuario.senha;

    res.status(200).json({ success: true, data: usuario });
  } catch (error) {
    res.status(500).json({ message: "Erro ao consultar usuário por e-mail.", error: error.message });
  }
};


// // LISTAR TODOS
export const consultarTodos = async (req, res) => {
    try {
        const search = req.query.search || null;
        const usuarios = await UsuarioModel.consultarTodos(search);

        res.json({
            success: true,
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao consultar usuários.",
            error: error.message
        });
    }
};

// CONSULTAR POR ID
export const consultarPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await UsuarioModel.consultarPorId(id);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado."
            });
        }

        res.json({
            success: true,
            data: usuario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao consultar usuário.",
            error: error.message
        });
    }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return responses.error(res, { statusCode: 400, message: "Email e senha são obrigatórios" });
    }

    const usuario = await UsuarioModel.login(email, senha);
    if (!usuario) {
      return responses.error(res, { statusCode: 401, message: "Credenciais inválidas" });
    }

    return responses.success(res, { message: "Login realizado com sucesso"});

  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};

// // Atualizar USUÁRIO
export const alterar = async (req, res) => {   
    try {
        const id = req.params.id;
        const dadosAtualizados = req.body;

        const resultado = await UsuarioModel.alterar(id, dadosAtualizados);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado para atualização."
            });
        }

        res.json({
            success: true,
            message: "Usuário atualizado com sucesso."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar usuário.",
            error: error.message
        });
    }
};

// // DELETAR USUÁRIO
export const deletarPorID = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await UsuarioModel.deletarPorID(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado para exclusão."
            });
        }

        res.json({
            success: true,
            message: "Usuário deletado com sucesso."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao deletar usuário.",
            error: error.message
        });
    }
};
