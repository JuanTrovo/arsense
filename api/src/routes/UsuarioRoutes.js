import { Router } from "express";
import * as UsuarioController from "../controllers/UsuarioController.js";

const router = Router();

// Rota para cadastrar usuário
router.post("/cadastrar", UsuarioController.cadastrar);

// // Rota para consultar todos os usuários (pode usar ?search=nome/email)
// router.get("/todos", UsuarioController.consultarTodos);

// // Rota para consultar usuário por Email
// router.get("/email", UsuarioController.consultarPorEmail);

// // Rota para consultar usuário por ID
// router.get("/:id", UsuarioController.consultarPorId);

// // Rota para alterar usuário
// router.put("/:id", UsuarioController.alterar);

// // Rota para deletar usuário
// router.delete("/:id", UsuarioController.deletarPorID);

// // Rota para login
// router.post("/login", UsuarioController.login);

export default router;
