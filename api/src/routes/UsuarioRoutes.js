import { Router } from "express";
import * as UsuarioController from "../controllers/UsuarioController.js";

const router = Router();

// Rota para cadastrar usuário
router.post("/", UsuarioController.cadastrar);

// Rota para consultar todos os usuários (pode usar ?search=nome/email)
router.get("/", UsuarioController.consultarTodos);

// Rota para consultar usuário por ID
router.get("/:id", UsuarioController.consultarPorID);

// Rota para alterar usuário
router.put("/:id", UsuarioController.alterar);

// Rota para deletar usuário
router.delete("/:id", UsuarioController.deletarPorID);

// Rota para login
router.post("/login", UsuarioController.login);

export default router;
