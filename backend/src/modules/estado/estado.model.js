import dbconn from "../../config/dbConexion.js";

export async function getEstadosDb() {
    const [rows] = await dbconn.query("SELECT * FROM estado");
    return rows;
}

export async function getEstadoByIdDb(id) {
    const [rows] = await dbconn.query("SELECT * FROM estado WHERE idestado = ?", [id]);
    return rows[0];
}

export async function createEstadoDb(estadoData) {
    const [result] = await dbconn.query("INSERT INTO estado SET ?", [estadoData]);
    return result;
}

export async function updateEstadoDb(id, estadoData) {
    const [result] = await dbconn.query("UPDATE estado SET ? WHERE idestado = ?", [estadoData, id]);
    return result;
}

export async function deleteEstadoDb(id) {
    const [result] = await dbconn.query("DELETE FROM estado WHERE idestado = ?", [id]);
    return result;
}
