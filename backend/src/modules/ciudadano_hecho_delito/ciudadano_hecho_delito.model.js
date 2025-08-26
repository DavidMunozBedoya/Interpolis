import dbconn from "../../config/dbConexion.js";

export async function getCiudadanoHechoDelitosDb() {
    const [rows] = await dbconn.query(`
        SELECT chd.*, c.nombre as nombre_ciudadano, d.delito as nombre_delito, h.descripcion as descripcion_hecho
        FROM ciudadano_hecho_delito chd
        JOIN ciudadano c ON chd.id_ciudadano = c.id
        JOIN delito d ON chd.id_delito = d.id
        JOIN hecho_punible h ON chd.id_hecho = h.id
    `);
    return rows;
}

export async function getCiudadanoHechoDelitoByIdDb(id) {
    const [rows] = await dbconn.query(`
        SELECT chd.*, c.nombre as nombre_ciudadano, d.delito as nombre_delito, h.descripcion as descripcion_hecho
        FROM ciudadano_hecho_delito chd
        JOIN ciudadano c ON chd.id_ciudadano = c.id
        JOIN delito d ON chd.id_delito = d.id
        JOIN hecho_punible h ON chd.id_hecho = h.id
        WHERE chd.id = ?
    `, [id]);
    return rows[0];
}

export async function createCiudadanoHechoDelitoDb(data) {
    const [result] = await dbconn.query(
        "INSERT INTO ciudadano_hecho_delito SET ?",
        {
            id_ciudadano: data.id_ciudadano,
            id_delito: data.id_delito,
            id_hecho: data.id_hecho,
            fecha_registro: data.fecha_registro
        }
    );
    return result;
}

export async function updateCiudadanoHechoDelitoDb(id, data) {
    const [result] = await dbconn.query(
        "UPDATE ciudadano_hecho_delito SET ? WHERE id = ?",
        [data, id]
    );
    return result;
}

export async function deleteCiudadanoHechoDelitoDb(id) {
    const [result] = await dbconn.query("DELETE FROM ciudadano_hecho_delito WHERE id = ?", [id]);
    return result;
}
