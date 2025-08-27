import {
    getAmonestacionesDb,
    getAmonestacionByIdDb,
    createAmonestacionDb,
    updateAmonestacionDb,
    deleteAmonestacionDb,
} from "./amonestacion.model.js";

import { validarAmonestacion } from "../helpers/validaciones.js";

export async function getAllAmonestaciones(req, res) {
    try {
        const amonestaciones = await getAmonestacionesDb();
        res.status(200).send({
            status: "ok",
            data: amonestaciones,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function getAmonestacionById(req, res) {
    const id = req.params.id;
    try {
        const amonestacion = await getAmonestacionByIdDb(id);
        if (!amonestacion) {
            throw {
                status: "error",
                message: "Amonestación no encontrada",
                statusCode: 404,
            };
        }
        res.status(200).send({
            status: "ok",
            data: amonestacion,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function createAmonestacion(req, res) {
    const amonestacionData = req.body;
    try {
        const errores = validarAmonestacion(amonestacionData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores,
            });
        }
        const amonestacionCreada = await createAmonestacionDb(amonestacionData);
        res.status(201).send({
            status: "ok",
            message: "Amonestación creada exitosamente",
            data: amonestacionCreada,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function updateAmonestacion(req, res) {
    const id = req.params.id;
    const amonestacionData = req.body;
    try {
        const errores = validarAmonestacion(amonestacionData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores,
            });
        }
        const amonestacionActualizada = await updateAmonestacionDb(id, amonestacionData);
        if (amonestacionActualizada.affectedRows === 0) {
            throw {
                status: "error",
                message: "Amonestación no encontrada o no hubo cambios",
                statusCode: 404,
            };
        }
        res.status(200).send({
            status: "ok",
            data: amonestacionActualizada,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function deleteAmonestacion(req, res) {
    const id = req.params.id;
    try {
        const result = await deleteAmonestacionDb(id);
        if (result.affectedRows === 0) {
            throw {
                status: "error",
                message: "Amonestación no encontrada, no se pudo eliminar",
                statusCode: 404,
            };
        }
        res.status(200).send({
            status: "ok",
            data: result,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}
