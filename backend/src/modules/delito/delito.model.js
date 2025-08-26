import dbconn from "../../config/dbConexion.js";

export async function getDelitosDb() {
    try{
        const [rows] = await dbconn.query("SELECT * FROM delito");
        return rows;
    } catch (error){
        console.error("Error al obtener delitos:", error);
        throw error;
    }
}

export async function getDelitosByIdDb(id) {
    try{
        const [rows] = await dbconn.query("SELECT * FROM delito WHERE iddelito = ?", [id]);
        return rows[0];
    } catch (error){
        console.error("Error al obtener delitos:", error);
        throw error;
    }
}

export async function createDelitoDb(delitoData) {
    try{
        const [result] = await dbconn.query("INSERT INTO delito SET ?", [delitoData]);
        return result.insertId;
    }catch (error){
        console.error("Error al crear delitos:", error);
        throw error;
    }
}

export async function updateDelitoDb(id, delitoData) {
    try{ 
        const [result] = await dbconn.query("UPDATE delito SET ? WHERE iddelito = ?", [delitoData, id]);
        return result;
    } catch (error){
        console.error("Error al actualizar delitos:", error);
        throw error;
    }    
}

export async function deleteDelitoDb(id) {
    try{
        const [result] = await dbconn.query("DELETE FROM delito WHERE iddelito = ?", [id]);
        return result;
    }catch (error){
        console.error("Error al eliminar delitos:", error);
        throw error;
    }
    
}


