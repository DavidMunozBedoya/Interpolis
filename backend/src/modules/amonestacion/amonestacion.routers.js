import express from "express";
import {
    getAllAmonestaciones,
    getAmonestacionById,
    createAmonestacion,
    updateAmonestacion,
    deleteAmonestacion
} from "./amonestacion.controller.js";

const router = express.Router();

router.get("/listaramonestaciones", getAllAmonestaciones);
router.get("/listaramonestaciones/:id", getAmonestacionById);
router.post("/crearamonestacion", createAmonestacion);
router.put("/actualizaramonestacion/:id", updateAmonestacion);
router.delete("/eliminaramonestacion/:id", deleteAmonestacion);

export default router;
