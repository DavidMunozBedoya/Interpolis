import dbconn from "../../config/dbConexion.js";

export async function getCiudadanos() {
    const [rows] = await dbconn.query("SELECT * FROM ciudadano");
    return rows;
}

export async function getCiudadanoByCodigo(codigo) {
    const [rows] = await dbconn.query("SELECT * FROM ciudadano WHERE codigo = ?", [codigo]);
    return rows[0];
}

export async function createCiudadano(ciudadanoData) {
    const [result] = await dbconn.query("INSERT INTO ciudadano SET ?", [
        ciudadanoData,
    ]);
    return result;
}

export async function updateCiudadano(codigo, ciudadanoData) {
    const [result] = await dbconn.query("UPDATE ciudadano SET ? WHERE codigo = ?", [
        ciudadanoData,
        codigo,
    ]);
    return result;
}

export async function deleteCiudadano(codigo) {
    const [result] = await dbconn.query("DELETE FROM ciudadano WHERE codigo = ?", [
        codigo,
    ]);
    return result;
}

