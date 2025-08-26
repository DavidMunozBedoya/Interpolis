import {
    getHechosPuniblesDb,
    getHechoPunibleByIdDb,
    createHechoPunibleDb,
    updateHechoPunibleDb,
    deleteHechoPunibleDb
} from "./hecho_punible.model.js";
import { validarHechoPunible } from "../helpers/validaciones.js";

export async function getAllHechosPunibles(req, res) {
    try {
        const hechosPunibles = await getHechosPuniblesDb();
        res.status(200).send({
            status: "ok",
            data: hechosPunibles
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function getHechoPunibleById(req, res) {
    try {
        const id = req.params.id;
        const hechoPunible = await getHechoPunibleByIdDb(id);
        if (!hechoPunible) {
            throw {
                status: "error",
                message: "Hecho Punible no encontrado",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: hechoPunible
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function createHechoPunible(req, res) {
    try {
        const hechoPunibleData = req.body;
        const errores = validarHechoPunible(hechoPunibleData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const hechoPunibleCreado = await createHechoPunibleDb(hechoPunibleData);
        res.status(201).send({
            status: "ok",
            data: hechoPunibleCreado
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function updateHechoPunible(req, res) {
    try {
        const id = req.params.id;
        const hechoPunibleData = req.body;
        const errores = validarHechoPunible(hechoPunibleData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const hechoPunibleActualizado = await updateHechoPunibleDb(id, hechoPunibleData);
        if (hechoPunibleActualizado.affectedRows === 0) {
            throw {
                status: "error",
                message: "Hecho Punible no encontrado o no hubo cambios",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: hechoPunibleActualizado
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function deleteHechoPunible(req, res) {
    try {
        const id = req.params.id;
        const result = await deleteHechoPunibleDb(id);
        if (result.affectedRows === 0) {
            throw {
                status: "error",
                message: "Hecho Punible no encontrado, no se pudo eliminar",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            message: "Hecho Punible eliminado correctamente"
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}
