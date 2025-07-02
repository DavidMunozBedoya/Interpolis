import express from "express";
import dbconn from "./dbConexion.js";

const ciudadano = express.Router();

ciudadano.get("/ciudadano/listar", async (req, res) => {
    try {
        //let consulta = "select * from ciudadano where estado = 1";
        let consulta = "select * from ciudadano";
        let [resultado] = await dbconn.query(consulta);

        res.send({
            estado: "ok",
            data: resultado,
        });
    } catch (error) {
        res.status(500).send({
            estado: "error",
            data: error.code + "=>" + error.message,
        });
    }
});

ciudadano.get('/ciudadano/buscarxCodigo/:codigo', async (req, res) => {
    try {
        let codigo = req.params.codigo;
        let consulta = "select * from ciudadano where codigo = ?";
        let [resultado] = await dbconn.query(consulta, [codigo]);
        res.send({
            estado: "ok",
            data: resultado,
        });
    } catch (error) {
        res.status(500).send({
            estado: "error",
            data: error.code + "=>" + error.message,
        });
    }
});

ciudadano.post('/ciudadano/crearRegistro', async (req, res) => {
    try {
        let datos = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            apodo_nickname: req.body.apodo_nickname,
            fecha_nacimiento: req.body.fecha_nacimiento,
            planeta_origen: req.body.planeta_origen,
            planeta_residencia: req.body.planeta_residencia,
            foto: req.body.foto,
            codigo_qr: req.body.codigo_qr,
            estado: 1
        }

        let consulta = "insert into ciudadano set ?";
        let [resultado] = await dbconn.query(consulta, [datos]);
        res.send({
            estado: "ok",
            data: resultado,
        });
    } catch (error) {
        res.status(500).send({
            estado: "error",
            data: error.code + "=>" + error.message,
        });
    }
});

ciudadano.put('/ciudadano/modificar/:codigo', async (req, res) => {
    try {
        let codigo = req.params.codigo;
        let datos = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            apodo_nickname: req.body.apodo_nickname,
            fecha_nacimiento: req.body.fecha_nacimiento,
            planeta_origen: req.body.planeta_origen,
            planeta_residencia: req.body.planeta_residencia,
            foto: req.body.foto,
            estado: req.body.estado
        };

        let consulta = "update ciudadano SET ? where codigo = ?";
        let [resultado] = await dbconn.query(consulta, [datos, codigo]);
        res.send({
            estado: "ok",
            data: resultado,
        });
    } catch (error) {
        res.status(500).send({
            estado: "error",
            data: error.code + "=>" + error.message,
        });
    }
});

ciudadano.put('/ciudadano/eliminacionLogica/:codigo', async (req, res) =>{
    try{
        let codigo = req.params.codigo;
        let estado = {
            estado: req.body.estado,
        };
        let consulta = "update ciudadano set ? where codigo = ?";
        let [resultado] = await dbconn.query(consulta, [estado, codigo]);
        res.send({
            estado: "ok",
            data: resultado,
        });
    } catch(error){
        res.status(500).send({
            estado: "error",
            data: error.code + "=>" * error.message,
        });
    }
});


export default ciudadano;