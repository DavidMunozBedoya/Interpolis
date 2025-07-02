import mysql from "mysql2/promise";

const dbconn = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
});

//prueba de la conexion
try{
    await dbconn.connect();
    console.log("Conexión Exitosa");
}catch (err){
    console.log(`Error en la conexion. Verifica!!! ${err}`);
}

export default dbconn;
