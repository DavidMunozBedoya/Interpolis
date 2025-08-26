import express from "express";
import{
    getAllCiudadanos,
    getCiudadanoXCodigo,
    createNuevoRegistro,
    updateRegistro,
    deleteRegistro,
} from "./ciudadano.controller.js";

import { 
    subirFoto 
} from "../helpers/multerConfig.js";

const router = express.Router();

//rutas
router.get("/listarciudadanos", getAllCiudadanos);
router.get("/traerciudadano/:codigo", getCiudadanoXCodigo);
router.post("/crearregistro", subirFoto.single("foto"), createNuevoRegistro);
router.put("/actualizarregistro/:codigo", subirFoto.single("foto"), updateRegistro);
router.delete("/eliminarregistro/:codigo", deleteRegistro);

export default router;