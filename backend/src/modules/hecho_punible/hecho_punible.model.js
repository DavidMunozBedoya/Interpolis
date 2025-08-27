import dbconn from "../../config/dbConexion.js";

export async function getHechosPuniblesDb() {
    const [rows] = await dbconn.query("SELECT * FROM hecho_punible");
    return rows;
}

export async function getHechoPunibleByIdDb(id) {
    const [rows] = await dbconn.query("SELECT * FROM hecho_punible WHERE idhecho_punible = ?", [id]);
    return rows[0];
}

export async function createHechoPunibleDb(data) {
    const [result] = await dbconn.query(
        "INSERT INTO hecho_punible SET ?",
        [data]
    );
    return result;
}

export async function updateHechoPunibleDb(id, data) {
    const [result] = await dbconn.query(
        "UPDATE hecho_punible SET ? WHERE idhecho_punible = ?",
        [data, id]
    );
    return result;
}

export async function deleteHechoPunibleDb(id) {
    const [result] = await dbconn.query("DELETE FROM hecho_punible WHERE idhecho_punible = ?", [id]);
    return result;
}
