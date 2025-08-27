import express from "express";
import {
    getAllAmonestaciones,
    getAmonestacionById,
    createAmonestacion,
    updateAmonestacion,
    deleteAmonestacion
} from "./amonestacion.controller.js";

const router = express.Router();

router.get("/listar", getAllAmonestaciones);
router.get("/buscar/:id", getAmonestacionById);
router.post("/crear", createAmonestacion);
router.put("/actualizar/:id", updateAmonestacion);
router.delete("/eliminar/:id", deleteAmonestacion);

export default router;
