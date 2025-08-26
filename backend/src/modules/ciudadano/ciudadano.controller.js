import e from "cors";
import {
    getCiudadanos,
    getCiudadanoByCodigo,
    createCiudadano,
    updateCiudadano,
    deleteCiudadano,
} from "./ciudadano.model.js";

import QRCode from "qrcode";
import path from "path";
import fs from "fs";

import { validarCiudadano } from "../helpers/validaciones.js";

export async function getAllCiudadanos(req, res) {
    try {
        const ciudadanos = await getCiudadanos();
        res.status(200).send({
            status: "ok",
            data: ciudadanos,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function getCiudadanoXCodigo(req, res) {
    try {
        const codigo = req.params.codigo;
        const ciudadano = await getCiudadanoByCodigo(codigo);
        if (!ciudadano) {
            throw {
                status: "error",
                message: "Ciudadano no encontrado",
                statusCode: 404,
            };
        }
        res.status(200).send({
            status: "ok",
            data: ciudadano,
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        });
    }
}

export async function createNuevoRegistro(req, res) {
    try {
        let data = req.body;

        if(req.file) {
            data.foto = `/fotos/${req.file.filename}`;
        }

        // Validación usando helper
        const errores = validarCiudadano(data);
        if (errores.length > 0) {
            res.status(400).send({
                status: "error",
                message: "Errores de validación",
                errors: errores
            });
            return;
        }

        // Generar el texto QR con todos los datos del ciudadano
        const qrText = JSON.stringify({
            nombre: data.nombre,
            apellidos: data.apellidos,
            apodo_nickname: data.apodo_nickname,
            fecha_nacimiento: data.fecha_nacimiento,
            planeta_origen: data.planeta_origen,
            planeta_residencia: data.planeta_residencia,
            foto: data.foto,
        });

        // Crear carpeta si no existe
        const qrDir = path.join(process.cwd(), "public", "qrcodes");
        if (!fs.existsSync(qrDir)) {
            fs.mkdirSync(qrDir, { recursive: true });
        }


    // Definir nombre y ruta del archivo QR
    const qrFileName = `${data.nombre}_qr_${Date.now()}.png`;
    const qrFilePath = path.join(qrDir, qrFileName);

    // Generar y guardar el QR
    await QRCode.toFile(qrFilePath, qrText);

    // Guardar la ruta relativa en la base de datos
    data.codigo_qr = `/codigo_qr/${qrFileName}`;

        const result = await createCiudadano(data);
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

export async function updateRegistro(req, res) {
    try {
        const codigo = req.params.codigo;
        const data = req.body;
        // Si se sube una nueva foto, actualizar la ruta
        if(req.file) {
            data.foto = `/fotos/${req.file.filename}`;
        }

        // Generar el texto QR con los datos actualizados
        const qrText = JSON.stringify({
            nombre: data.nombre,
            apellidos: data.apellidos,
            apodo_nickname: data.apodo_nickname,
            fecha_nacimiento: data.fecha_nacimiento,
            planeta_origen: data.planeta_origen,
            planeta_residencia: data.planeta_residencia,
            foto: data.foto,
        });

        // Crear carpeta si no existe
        const qrDir = path.join(process.cwd(), "public", "qrcodes");
        if (!fs.existsSync(qrDir)) {
            fs.mkdirSync(qrDir, { recursive: true });
        }


    // Definir nombre y ruta del archivo QR (igual que en creación)
    const qrFileName = `${codigo}_qr_${Date.now()}.png`;
    const qrFilePath = path.join(qrDir, qrFileName);

    // Generar y guardar el QR
    await QRCode.toFile(qrFilePath, qrText);

    // Guardar la ruta relativa en la base de datos
    data.codigo_qr = `/codigo_qr/${qrFileName}`;

        const result = await updateCiudadano(codigo, data);
        if (result.affectedRows === 0) {
            throw {
                status: "error",
                message: "Ciudadano no encontrado o no hubo cambios en la DB",
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

export async function deleteRegistro(req, res) {
    try {
        const codigo = req.params.codigo;
        const result = await deleteCiudadano(codigo);
        if (result.affectedRows === 0) {
            throw {
                status: "error",
                message: "Ciudadano no encontrado, no se pudo eliminar de la DB",
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