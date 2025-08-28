import jwt from 'jsonwebtoken';

export const generarToken = (payload, vida) => {

    const options = {
        expiresIn: vida,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);

};

export const usuarioMiddleware = (req, res, next) =>{

    try{
        const tokenRecibido = req.headers.authorization;

        // Mostrar el token en la respuesta Y continuar
        /* res.status(200).send({
            status: "success",
            message: "Token recibido correctamente - MODO PRUEBA",
            token: tokenRecibido,
            timestamp: new Date().toISOString()
        }); */

        if(!tokenRecibido){
            return res.status(401).send({
                status: "error",
                message: "Token no proporcionado o invalido",
            });
        }

        //comparacion token req con token generado en el login

        let tokenOK = jwt.verify(tokenRecibido, process.env.JWT_SECRET);
        if(!tokenOK){
            return res.status(401).send({
                status: "error",
                message: "Token no valido o expirado",
            })
        }

        next();

    } catch(error){
        res.status(401).send({
            status: "error",
            message: "No autorizado, token invalido" + error, 
        });
    }
    
}
