import express from "express";
import "dotenv/config";
//import ciudadano from "./src/gestionCiudadanos.js";   
import ciudadanoModule from "./src/modules/ciudadano/ciudadano.routers.js"
import usuarioModule from "./src/modules/usuario/usuario.routers.js";
import delitoModule from "./src/modules/delito/delito.routers.js";
import amonestaciones from "./src/modules/amonestacion/amonestacion.routers.js";
import estadoModule from "./src/modules/estado/estado.routers.js";
import estadoDelitoModule from "./src/modules/estado_delito/estado_delito.routers.js";
import estadoProcesalModule from "./src/modules/estado_procesal/estado_procesal.routers.js";
import hechoPunibleModule from "./src/modules/hecho_punible/hecho_punible.routers.js";
import rolModule from "./src/modules/rol/rol.routers.js";
import ciudadanoHechoDelitoModule from "./src/modules/ciudadano_hecho_delito/ciudadano_hecho_delito.routers.js";
//import "./src/dbConexion.js"; prueba de que la base de datos esta conectada
import cors from "cors";


const app = express();

app.use(express.json());
app.use(cors());
// Sirve las carpetas públicas para fotos y qrs
app.use('/fotos', express.static('public/fotos'));
app.use('/qrs', express.static('public/qrcodes'));

//rutas
app.use("/ciudadano", ciudadanoModule);
app.use("/usuario", usuarioModule);
app.use("/delito", delitoModule);
app.use("/amonestacion", amonestaciones);
app.use("/estado", estadoModule);
app.use("/estado-delito", estadoDelitoModule);
app.use("/estado-procesal", estadoProcesalModule);
app.use("/hecho-punible", hechoPunibleModule);
app.use("/rol", rolModule);
app.use("/ciudadano-hecho-delito", ciudadanoHechoDelitoModule);

let puerto = process.env.APP_PORT || 4100;
app.listen(puerto, () => {
    console.log(`API ejecutandose en el puerto ${puerto}`);
})