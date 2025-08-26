import express from "express";
import {
    getAllDelitos,
    getDelitoById,
    createDelito,
    updateDelito,
    deleteDelito
} from "./delito.controller.js";

const router = express.Router();

router.get("/listardelitos", getAllDelitos);
router.get("/listardelitos/:id", getDelitoById);
router.post("/creardelito", createDelito);
router.put("/actualizardelito/:id", updateDelito);
router.delete("/eliminardelito/:id", deleteDelito);

export default router;