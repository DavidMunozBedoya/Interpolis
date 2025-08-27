import dbconn from "../../config/dbConexion.js";

export async function getEstadosProcesalesDb() {
    const [rows] = await dbconn.query("SELECT * FROM estado_procesal");
    return rows;
}

export async function getEstadoProcesalByIdDb(id) {
    const [rows] = await dbconn.query("SELECT * FROM estado_procesal WHERE idestado_procesal = ?", [id]);
    return rows[0];
}

export async function createEstadoProcesalDb(data) {
    const [result] = await dbconn.query(
        "INSERT INTO estado_procesal SET ?",
        [data]
    );
    return result;
}

export async function updateEstadoProcesalDb(id, data) {
    const [result] = await dbconn.query(
        "UPDATE estado_procesal SET ? WHERE idestado_procesal = ?",
        [data, id]
    );
    return result;
}

export async function deleteEstadoProcesalDb(id) {
    const [result] = await dbconn.query("DELETE FROM estado_procesal WHERE idestado_procesal = ?", [id]);
    return result;
}
