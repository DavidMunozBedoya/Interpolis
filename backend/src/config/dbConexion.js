import mysql from "mysql2/promise";

/* const dbconn = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

//prueba de la conexion
try{
    await dbconn.connect();
    console.log("Conexión Exitosa");
}catch (err){
    console.log(`Error en la conexion. Verifica!!! ${err}`);
} */

//configuracion para render

const dbconn = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT // Asegúrate de incluir el puerto si lo usas
});

export default dbconn;
