import express from "express";
import "dotenv/config";
import ciudadano from "./src/gestionCiudadanos.js";    
//import "./src/dbConexion.js"; prueba de que la base de datos esta conectada
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

app.use("/", ciudadano);

let puerto = process.env.APP_PORT || 4100;
app.listen(puerto, () => {
    console.log(`API ejecutandose en el puerto ${puerto}`);
})