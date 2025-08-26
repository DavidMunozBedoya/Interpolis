import{
    getDelitosDb,
    getDelitosByIdDb,
    createDelitoDb,
    updateDelitoDb,
    deleteDelitoDb,
} from "./delito.model.js";

import { validarDelito } from "../helpers/validaciones.js";

export async function getAllDelitos(req, res) {
    try {
        const delitos = await getDelitosDb();
        res.status(200).send({
            status: "ok",
            data: delitos,
        });
        
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function getDelitoById(req, res) {
    const id = req.params.id;
    const delito = await getDelitosByIdDb(id);
    try {
        if (!delito) {
            throw {
                status: "error",
                message: "Delito no encontrado",
                statusCode: 404,
            };
        }
        res.status(200).send({
            status: "ok",
            data: delito,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function createDelito(req, res) {
    const delitoData = req.body;
    try {
        const errores = validarDelito(delitoData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores,
            });
        }
        const delitoCreado = await createDelitoDb(delitoData);
        res.status(201).send({
            status: "ok",
            data: delitoCreado,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function updateDelito(req, res) {
    const id = req.params.id;
    const delitoData = req.body;
    try {
        const errores = validarDelito(delitoData);
        if (errores.length > 0) {
            return res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores,
            });
        }
        const delitoActualizado = await updateDelitoDb(id, delitoData);
        res.status(200).send({
            status: "ok",
            data: delitoActualizado,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function deleteDelito(req, res) {
    const id = req.params.id;
    try {
        const delitoEliminado = await deleteDelitoDb(id);
        if(delitoEliminado.affectedRows === 0) {
            throw {
                status: "error",
                message: "Delito no encontrado, no se pudo eliminar",
                statusCode: 404,
            };
        }
    res.status(200).send({
        status: "ok",
        data: delitoEliminado,
    });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}
