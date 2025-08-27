import express from "express";
import {
    getAllCiudadanoHechoDelitos,
    getCiudadanoHechoDelitoById,
    createCiudadanoHechoDelito,
    updateCiudadanoHechoDelito,
    deleteCiudadanoHechoDelito
} from "./ciudadano_hecho_delito.controller.js";

const router = express.Router();

// Rutas protegidas con token
router.get("/listar", getAllCiudadanoHechoDelitos);
router.get("/buscar/:id", getCiudadanoHechoDelitoById);
router.post("/crear/", createCiudadanoHechoDelito);
router.put("/actualizar/:id", updateCiudadanoHechoDelito);
router.delete("/eliminar/:id", deleteCiudadanoHechoDelito);

export default router;
