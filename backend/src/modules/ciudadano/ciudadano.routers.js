import express from "express";
import{
    getAllCiudadanos,
    getCiudadanoXCodigo,
    createNuevoRegistro,
    updateRegistro,
    deleteRegistro,
} from "./ciudadano.controller.js";

const router = express.Router();

//rutas
router.get("/listarciudadanos", getAllCiudadanos);
router.get("/traerciudadano/:codigo", getCiudadanoXCodigo);
router.post("/crearregistro", createNuevoRegistro);
router.put("/actualizarregistro/:codigo", updateRegistro);
router.delete("/eliminarregistro/:codigo", deleteRegistro);

export default router;