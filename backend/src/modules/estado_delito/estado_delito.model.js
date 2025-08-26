import dbconn from "../../config/dbConexion.js";

export async function getEstadosDelitoDb() {
    const [rows] = await dbconn.query("SELECT * FROM estado_delito");
    return rows;
}

export async function getEstadoDelitoByIdDb(id) {
    const [rows] = await dbconn.query("SELECT * FROM estado_delito WHERE id = ?", [id]);
    return rows[0];
}

export async function createEstadoDelitoDb(data) {
    const [result] = await dbconn.query(
        "INSERT INTO estado_delito SET ?",
        [data]
    );
    return result;
}

export async function updateEstadoDelitoDb(id, data) {
    const [result] = await dbconn.query(
        "UPDATE estado_delito SET ? WHERE id = ?",
        [data, id]
    );
    return result;
}

export async function deleteEstadoDelitoDb(id) {
    const [result] = await dbconn.query("DELETE FROM estado_delito WHERE id = ?", [id]);
    return result;
}
