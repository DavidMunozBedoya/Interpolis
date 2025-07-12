import {
    getCiudadanos,
    getCiudadanoByCodigo,
    createCiudadano,
    updateCiudadano,
    deleteCiudadano,
} from "./ciudadano.model.js";

export async function getAllCiudadanos(req, res) {
    try{
        const ciudadanos = await getCiudadanos();
        res.status(200).send({
            status: "ok",
            data: ciudadanos,
        });
    } catch(error){
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function getCiudadanoXCodigo(req, res) {
    try{
        const codigo = req.params.codigo;
        const ciudadano = await getCiudadanoByCodigo(codigo);
        if(!ciudadano){
            throw{ 
                status: "error",
                message: "Ciudadano no encontrado",
                statusCode: 404,
            };
        }
        res.status(200).send({
            status: "ok",
            data: ciudadano,
        })
    } catch(error){
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function createNuevoRegistro(req, res) {
    try{
        let result = await createCiudadano(req.body);
        res.status(200).send({
            status: "ok",
            data: result,
        });
    } catch(error){
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function updateRegistro(req, res) {
    try{
        const codigo = req.params.codigo;
        const data = req.body;
        const result = await updateCiudadano(codigo, data);
        if(result.affectedRows === 0){
            throw{
                status: "error",
                message: "Ciudadano no encontrado o no hubo cambios en la DB",
                statusCode: 404,
            };
        }
        res.status(200).send({
            status: "ok",
            data: result,
        });
    } catch(error){
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function deleteRegistro(req, res) {
    try{
        const codigo = req.params.codigo;
        const result = await deleteCiudadano(codigo);
        if(result.affectedRows === 0){
            throw{
                status: "error",
                message: "Ciudadano no encontrado, no se pudo eliminar de la DB",
                statusCode: 404,
            };
        }
        res.status(200).send({
            status: "ok",
            data: result,
        });
    } catch(error){
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}