import express from "express";
import { 
    getAllEstados,
    getEstadoById,
    createEstado,
    updateEstado,
    deleteEstado
} from "./estado.controller.js";

const router = express.Router();

// Rutas protegidas con token
router.get("/listarestados", getAllEstados);
router.get("/traerestado/:id", getEstadoById);
router.post("/crearestado", createEstado);
router.put("/actualizarestado/:id", updateEstado);
router.delete("/eliminarestado/:id", deleteEstado);

export default router;
