import express from "express";
import {
    getAllEstadosProcesales,
    getEstadoProcesalById,
    createEstadoProcesal,
    updateEstadoProcesal,
    deleteEstadoProcesal
} from "./estado_procesal.controller.js";

const router = express.Router();

// Rutas protegidas con token
router.get("/listarestadoprocesal", getAllEstadosProcesales);
router.get("/traerestadoprocesal/:id", getEstadoProcesalById);
router.post("/crearestadoprocesal", createEstadoProcesal);
router.put("/actualizarestadoprocesal/:id", updateEstadoProcesal);
router.delete("/eliminarestadoprocesal/:id", deleteEstadoProcesal);

export default router;
