import {
    getCiudadanoHechoDelitosDb,
    getCiudadanoHechoDelitoByIdDb,
    createCiudadanoHechoDelitoDb,
    updateCiudadanoHechoDelitoDb,
    deleteCiudadanoHechoDelitoDb
} from "./ciudadano_hecho_delito.model.js";
import { validarCiudadanoHechoDelito } from "../helpers/validaciones.js";

export async function getAllCiudadanoHechoDelitos(req, res) {
    try {
        const registros = await getCiudadanoHechoDelitosDb();
        res.status(200).send({
            status: "ok",
            data: registros
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function getCiudadanoHechoDelitoById(req, res) {
    try {
        const id = req.params.id;
        const registro = await getCiudadanoHechoDelitoByIdDb(id);
        if (!registro) {
            throw {
                status: "error",
                message: "Registro no encontrado",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: registro
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function createCiudadanoHechoDelito(req, res) {
    try {
        const data = req.body;
        const errores = validarCiudadanoHechoDelito(data);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const registroCreado = await createCiudadanoHechoDelitoDb(data);
        res.status(201).send({
            status: "ok",
            data: registroCreado
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function updateCiudadanoHechoDelito(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const errores = validarCiudadanoHechoDelito(data);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const registroActualizado = await updateCiudadanoHechoDelitoDb(id, data);
        if (registroActualizado.affectedRows === 0) {
            throw {
                status: "error",
                message: "Registro no encontrado o no hubo cambios",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: registroActualizado
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function deleteCiudadanoHechoDelito(req, res) {
    try {
        const id = req.params.id;
        const result = await deleteCiudadanoHechoDelitoDb(id);
        if (result.affectedRows === 0) {
            throw {
                status: "error",
                message: "Registro no encontrado, no se pudo eliminar",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            message: "Registro eliminado correctamente"
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}
