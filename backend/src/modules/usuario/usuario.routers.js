import express from "express";
import {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    deleteUsuario,
    updateUsuario,
    authUsuario,
} from "./usuario.controller.js";

const router = express.Router();

//rutas
router.get("/listarusuarios", getAllUsuarios);
router.get("/listarusuarioporid/:id", getUsuarioById);
router.post("/crearusuario", createUsuario);
router.post("/autenticacion", authUsuario);
router.put("/actualizarusuarioporid/:id", updateUsuario);
router.delete("/eliminarusuarioporid/:id", deleteUsuario);

export default router;

