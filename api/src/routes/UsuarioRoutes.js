import { Router } from "express";
import * as UsuarioController from "../controllers/UsuarioController.js";

const router = Router();

// Rota para cadastrar usuário
router.post("/usuario", UsuarioController.cadastrar);

// // Rota para consultar todos os usuários (pode usar ?search=nome/email)
router.get("/usuarios", UsuarioController.consultarTodos);

// // Rota para consultar usuário por Email
router.get("/email", UsuarioController.consultarPorEmail);

// // Rota para consultar usuário por ID
router.get("/usuario/:id", UsuarioController.consultarPorId);

// // Rota para login
router.post("/usuario/login", UsuarioController.login);

// // Rota para alterar usuário
router.patch("/usuario/:id", UsuarioController.alterar);

// // Rota para deletar usuário
router.delete("/usuario/:id", UsuarioController.deletarPorID);


export default router;
