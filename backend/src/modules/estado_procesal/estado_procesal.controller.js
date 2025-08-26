import {
    getEstadosProcesalesDb,
    getEstadoProcesalByIdDb,
    createEstadoProcesalDb,
    updateEstadoProcesalDb,
    deleteEstadoProcesalDb
} from "./estado_procesal.model.js";
import { validarEstadoProcesal } from "../helpers/validaciones.js";

export async function getAllEstadosProcesales(req, res) {
    try {
        const estadosProcesales = await getEstadosProcesalesDb();
        res.status(200).send({
            status: "ok",
            data: estadosProcesales
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function getEstadoProcesalById(req, res) {
    try {
        const id = req.params.id;
        const estadoProcesal = await getEstadoProcesalByIdDb(id);
        if (!estadoProcesal) {
            throw {
                status: "error",
                message: "Estado Procesal no encontrado",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: estadoProcesal
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function createEstadoProcesal(req, res) {
    try {
        const estadoProcesalData = req.body;
        const errores = validarEstadoProcesal(estadoProcesalData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const estadoProcesalCreado = await createEstadoProcesalDb(estadoProcesalData);
        res.status(201).send({
            status: "ok",
            data: estadoProcesalCreado
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function updateEstadoProcesal(req, res) {
    try {
        const id = req.params.id;
        const estadoProcesalData = req.body;
        const errores = validarEstadoProcesal(estadoProcesalData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const estadoProcesalActualizado = await updateEstadoProcesalDb(id, estadoProcesalData);
        if (estadoProcesalActualizado.affectedRows === 0) {
            throw {
                status: "error",
                message: "Estado Procesal no encontrado o no hubo cambios",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: estadoProcesalActualizado
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function deleteEstadoProcesal(req, res) {
    try {
        const id = req.params.id;
        const result = await deleteEstadoProcesalDb(id);
        if (result.affectedRows === 0) {
            throw {
                status: "error",
                message: "Estado Procesal no encontrado, no se pudo eliminar",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            message: "Estado Procesal eliminado correctamente"
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}
