import dbconn from "../../config/dbConexion.js";

export async function getCiudadanoHechoDelitosDb() {
    const [rows] = await dbconn.query("SELECT * FROM ciudadano_hecho_delito");
    return rows;
}

export async function getCiudadanoHechoDelitoByIdDb(id) {
    const [rows] = await dbconn.query(
        "SELECT * FROM ciudadano_hecho_delito WHERE idciudadano_hecho_delito = ?",
        [id]
    );
    return rows[0];
}

export async function createCiudadanoHechoDelitoDb(data) {
    const [result] = await dbconn.query(
        "INSERT INTO ciudadano_hecho_delito SET ?",
        [data]
    );
    return result.insertId;
}

export async function updateCiudadanoHechoDelitoDb(id, data) {
    const [result] = await dbconn.query(
        "UPDATE ciudadano_hecho_delito SET ? WHERE idciudadano_hecho_delito = ?",
        [data, id]
    );
    return result.affectedRows;
}

export async function deleteCiudadanoHechoDelitoDb(id) {
    const [result] = await dbconn.query(
        "DELETE FROM ciudadano_hecho_delito WHERE idciudadano_hecho_delito = ?",
        [id]
    );
    return result.affectedRows;
}
