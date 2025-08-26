import {
    getEstadosDb,
    getEstadoByIdDb,
    createEstadoDb,
    updateEstadoDb,
    deleteEstadoDb
} from "./estado.model.js";

import { validarEstado } from "../helpers/validaciones.js";

export async function getAllEstados(req, res) {
    try {
        const estados = await getEstadosDb();
        res.status(200).send({
            status: "ok",
            data: estados
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function getEstadoById(req, res) {
    try {
        const id = req.params.id;
        const estado = await getEstadoByIdDb(id);
        if (!estado) {
            throw {
                status: "error",
                message: "Estado no encontrado",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: estado
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function createEstado(req, res) {
    try {
        const estadoData = req.body;
        console.log(estadoData);
        const errores = validarEstado(estadoData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const estadoCreado = await createEstadoDb(estadoData);
        res.status(201).send({
            status: "ok",
            data: estadoCreado
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function updateEstado(req, res) {
    try {
        const id = req.params.id;
        const estadoData = req.body;
        const errores = validarEstado(estadoData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const estadoActualizado = await updateEstadoDb(id, estadoData);
        if (estadoActualizado.affectedRows === 0) {
            throw {
                status: "error",
                message: "Estado no encontrado o no hubo cambios",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: estadoActualizado
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function deleteEstado(req, res) {
    try {
        const id = req.params.id;
        const result = await deleteEstadoDb(id);
        if (result.affectedRows === 0) {
            throw {
                status: "error",
                message: "Estado no encontrado, no se pudo eliminar",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}
