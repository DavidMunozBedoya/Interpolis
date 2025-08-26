import express from "express";
import {
    getAllHechosPunibles,
    getHechoPunibleById,
    createHechoPunible,
    updateHechoPunible,
    deleteHechoPunible
} from "./hecho_punible.controller.js";


const router = express.Router();

// Rutas protegidas con token
router.get("/listarhechos", getAllHechosPunibles);
router.get("/traerhechos/:id", getHechoPunibleById);
router.post("/crearhecho", createHechoPunible);
router.put("/actualizarhecho/:id", updateHechoPunible);
router.delete("/eliminarhecho/:id", deleteHechoPunible);

export default router;
