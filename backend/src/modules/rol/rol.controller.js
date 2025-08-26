import {
    getRolesDb,
    getRolByIdDb,
    createRolDb,
    updateRolDb,
    deleteRolDb
} from "./rol.model.js";
import { validarRol } from "../helpers/validaciones.js";

export async function getAllRoles(req, res) {
    try {
        const roles = await getRolesDb();
        res.status(200).send({
            status: "ok",
            data: roles
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function getRolById(req, res) {
    try {
        const id = req.params.id;
        const rol = await getRolByIdDb(id);
        if (!rol) {
            throw {
                status: "error",
                message: "Rol no encontrado",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: rol
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function createRol(req, res) {
    try {
        const rolData = req.body;
        const errores = validarRol(rolData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const rolCreado = await createRolDb(rolData);
        res.status(201).send({
            status: "ok",
            data: rolCreado
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message
        });
    }
}

export async function updateRol(req, res) {
    try {
        const id = req.params.id;
        const rolData = req.body;
        const errores = validarRol(rolData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
        }
        const rolActualizado = await updateRolDb(id, rolData);
        if (rolActualizado.affectedRows === 0) {
            throw {
                status: "error",
                message: "Rol no encontrado o no hubo cambios",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            data: rolActualizado
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}

export async function deleteRol(req, res) {
    try {
        const id = req.params.id;
        const result = await deleteRolDb(id);
        if (result.affectedRows === 0) {
            throw {
                status: "error",
                message: "Rol no encontrado, no se pudo eliminar",
                statusCode: 404
            };
        }
        res.status(200).send({
            status: "ok",
            message: "Rol eliminado correctamente"
        });
    } catch (error) {
        res.status(error.statusCode || 500).send({
            status: "error",
            message: error.message
        });
    }
}
