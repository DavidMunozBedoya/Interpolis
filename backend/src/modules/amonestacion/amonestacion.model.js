import dbconn from "../../config/dbConexion.js";

export async function getAmonestacionesDb() {
    try {
        const [rows] = await dbconn.query("SELECT * FROM amonestacion");
        return rows;
    } catch (error) {
        console.error("Error al obtener amonestaciones:", error);
        throw error;
    }
}

export async function getAmonestacionByIdDb(id) {
    try {
        const [rows] = await dbconn.query("SELECT * FROM amonestacion WHERE id_amonestacion = ?", [id]);
        return rows[0];
    } catch (error) {
        console.error("Error al obtener amonestación:", error);
        throw error;
    }
}

export async function createAmonestacionDb(amonestacionData) {
    try {
        const [result] = await dbconn.query("INSERT INTO amonestacion SET ?", [amonestacionData]);
        return result.insertId;
    } catch (error) {
        console.error("Error al crear amonestación:", error);
        throw error;
    }
}

export async function updateAmonestacionDb(id, amonestacionData) {
    try {
        const [result] = await dbconn.query("UPDATE amonestacion SET ? WHERE id_amonestacion = ?", [amonestacionData, id]);
        return result;
    } catch (error) {
        console.error("Error al actualizar amonestación:", error);
        throw error;
    }
}

export async function deleteAmonestacionDb(id) {
    try {
        const [result] = await dbconn.query("DELETE FROM amonestacion WHERE id_amonestacion = ?", [id]);
        return result;
    } catch (error) {
        console.error("Error al eliminar amonestación:", error);
        throw error;
    }
}
