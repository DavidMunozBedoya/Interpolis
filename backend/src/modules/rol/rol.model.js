import dbconn from "../../config/dbConexion.js";

export async function getRolesDb() {
    const [rows] = await dbconn.query("SELECT * FROM rol");
    return rows;
}

export async function getRolByIdDb(id) {
    const [rows] = await dbconn.query("SELECT * FROM rol WHERE idrol = ?", [id]);
    return rows[0];
}

export async function createRolDb(data) {
    const [result] = await dbconn.query(
        "INSERT INTO rol SET ?",
        [data]
    );
    return result;
}

export async function updateRolDb(id, data) {
    const [result] = await dbconn.query(
        "UPDATE rol SET ? WHERE idrol = ?",
        [data, id]
    );
    return result;
}

export async function deleteRolDb(id) {
    const [result] = await dbconn.query("DELETE FROM rol WHERE idrol = ?", [id]);
    return result;
}
