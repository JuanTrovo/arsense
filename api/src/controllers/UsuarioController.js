import * as UsuarioModel from "../models/UsuarioModel.js";
import jwt from "jsonwebtoken"; // para autenticação (se precisar token JWT)

// ==================================================
// CADASTRAR USUÁRIO
// ==================================================
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
            id: insertId
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao cadastrar usuário.",
            error: error.message
        });
    }
};


// export const consultarPorEmail = async (req, res) => {
//   try {
//     const { email } = req.query;

//     if (!email) {
//       return res.status(400).json({ message: "O e-mail precisa ser informado na query (?email=...)" });
//     }

//     const usuario = await UsuarioModel.consultarPorEmail(email);

//     if (!usuario) {
//       return res.status(404).json({ message: "Usuário não encontrado." });
//     }

//     delete usuario.senha;

//     res.status(200).json({ success: true, data: usuario });
//   } catch (error) {
//     res.status(500).json({ message: "Erro ao consultar usuário por e-mail.", error: error.message });
//   }
// };

// // ==================================================
// // LISTAR TODOS
// // ==================================================
// export const consultarTodos = async (req, res) => {
//     try {
//         const search = req.query.search || null;
//         const usuarios = await UsuarioModel.consultarTodos(search);

//         res.json({
//             success: true,
//             data: usuarios
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Erro ao consultar usuários.",
//             error: error.message
//         });
//     }
// };

// export const consultarPorId = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const usuario = await UsuarioModel.consultarPorId(id);

//         if (!usuario) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Usuário não encontrado."
//             });
//         }

//         res.json({
//             success: true,
//             data: usuario
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Erro ao consultar usuário.",
//             error: error.message
//         });
//     }
// };

// // ==================================================
// // ALTERAR USUÁRIO
// // ==================================================
// export const alterar = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const dadosAtualizados = req.body;

//         const result = await UsuarioModel.alterar(id, dadosAtualizados);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Usuário não encontrado para alteração."
//             });
//         }

//         res.json({
//             success: true,
//             message: "Usuário alterado com sucesso."
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Erro ao alterar usuário.",
//             error: error.message
//         });
//     }
// };

// // ==================================================
// // DELETAR USUÁRIO
// // ==================================================
// export const deletarPorID = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const result = await UsuarioModel.deletarPorID(id);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Usuário não encontrado para exclusão."
//             });
//         }

//         res.json({
//             success: true,
//             message: "Usuário deletado com sucesso."
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Erro ao deletar usuário.",
//             error: error.message
//         });
//     }
// };

// // ==================================================
// // LOGIN
// // ==================================================
// export const login = async (req, res) => {
//     try {
//         const { email, senha } = req.body;

//         if (!email || !senha) {
//             return res.status(400).json({
//                 success: false,
//                 message: "E-mail e senha são obrigatórios."
//             });
//         }

//         // Buscar usuário
//         const usuario = await UsuarioModel.consultarTodos(email);
//         const user = usuario.find(u => u.email === email);

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Usuário não encontrado."
//             });
//         }

//         // Comparar senha
//         const senhaValida = await bcrypt.compare(senha, user.senha);
//         if (!senhaValida) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Senha incorreta."
//             });
//         }

//         // Gerar token JWT (opcional)
//         const token = jwt.sign(
//             { id: user.id, email: user.email, tipo_usuario: user.tipo_usuario },
//             process.env.JWT_SECRET || "chave_secreta",
//             { expiresIn: "1h" }
//         );

//         res.json({
//             success: true,
//             message: "Login realizado com sucesso.",
//             token
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Erro ao realizar login.",
//             error: error.message
//         });
//     }
// };
