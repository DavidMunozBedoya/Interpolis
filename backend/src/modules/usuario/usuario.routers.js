import express from "express";
import {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    deleteUsuario,
    updateUsuario,
    authUsuario,
} from "./usuario.controller.js";

import { usuarioMiddleware } from "../helpers/administrarToken.js";

const router = express.Router();

//rutas
router.get("/listarusuarios", usuarioMiddleware, getAllUsuarios);
router.get("/listarusuarioporid/:id", getUsuarioById);
router.post("/crearusuario", createUsuario);
router.post("/autenticacion", authUsuario);
router.put("/actualizarusuarioporid/:id", updateUsuario);
router.delete("/eliminarusuarioporid/:id", deleteUsuario);

export default router;

