import {
    getEstadosDelitoDb,
    getEstadoDelitoByIdDb,
    createEstadoDelitoDb,
    updateEstadoDelitoDb,
    deleteEstadoDelitoDb
} from "./estado_delito.model.js";
import { validarEstadoDelito } from "../helpers/validaciones.js";

export async function getAllEstadosDelito(req, res) {
    try {
        const estadosDelito = await getEstadosDelitoDb();
        res.status(200).send({
            status: "ok",
            data: estadosDelito
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function getEstadoDelitoById(req, res) {
    try {
        const id = req.params.id;
        const estadoDelito = await getEstadoDelitoByIdDb(id);
        if (!estadoDelito) {
            throw {
                status: "error",
                message: "Estado-Delito no encontrado",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: estadoDelito
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function createEstadoDelito(req, res) {
    try {
        const estadoDelitoData = req.body;
        const errores = validarEstadoDelito(estadoDelitoData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const estadoDelitoCreado = await createEstadoDelitoDb(estadoDelitoData);
        res.status(201).send({
            status: "ok",
            data: estadoDelitoCreado
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function updateEstadoDelito(req, res) {
    try {
        const id = req.params.id;
        const estadoDelitoData = req.body;
        const errores = validarEstadoDelito(estadoDelitoData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const estadoDelitoActualizado = await updateEstadoDelitoDb(id, estadoDelitoData);
        if (estadoDelitoActualizado.affectedRows === 0) {
            throw {
                status: "error",
                message: "Estado-Delito no encontrado o no hubo cambios",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: estadoDelitoActualizado
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function deleteEstadoDelito(req, res) {
    try {
        const id = req.params.id;
        const result = await deleteEstadoDelitoDb(id);
        if (result.affectedRows === 0) {
            throw {
                status: "error",
                message: "Estado-Delito no encontrado, no se pudo eliminar",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            message: "Estado-Delito eliminado correctamente"
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}
