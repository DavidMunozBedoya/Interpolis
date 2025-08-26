import express from "express";
import {
    getAllRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
} from "./rol.controller.js";

const router = express.Router();

// Rutas protegidas con token
router.get("/listarroles", getAllRoles);
router.get("/traerroles/:id", getRolById);
router.post("/crearrol", createRol);
router.put("/actualizarrol/:id", updateRol);
router.delete("/eliminarrol/:id", deleteRol);

export default router;
