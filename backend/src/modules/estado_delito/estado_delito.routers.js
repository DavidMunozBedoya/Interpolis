import express from "express";
import {
    getAllEstadosDelito,
    getEstadoDelitoById,
    createEstadoDelito,
    updateEstadoDelito,
    deleteEstadoDelito
} from "./estado_delito.controller.js";

const router = express.Router();

// Rutas protegidas con token
router.get("/listarestadodelito", getAllEstadosDelito);
router.get("/traerestadodelito/:id", getEstadoDelitoById);
router.post("/crearestadodelito", createEstadoDelito);
router.put("/actualizarestadodelito/:id", updateEstadoDelito);
router.delete("/eliminarestadodelito/:id", deleteEstadoDelito);

export default router;
