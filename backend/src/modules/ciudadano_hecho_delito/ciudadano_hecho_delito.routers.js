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
router.get("/", getAllCiudadanoHechoDelitos);
router.get("/:id", getCiudadanoHechoDelitoById);
router.post("/", createCiudadanoHechoDelito);
router.put("/:id", updateCiudadanoHechoDelito);
router.delete("/:id", deleteCiudadanoHechoDelito);

export default router;
