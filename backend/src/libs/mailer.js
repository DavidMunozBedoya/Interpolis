import nodemailer from "nodemailer";
import "dotenv/config";

// funcion para enviar correo electronico trasporter= objeto que gestiona el envio
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,  // direccion email en definida en .env gmail
        pass: process.env.EMAIL_PASS // contraseña de aplicacion
    }
});

// funcion para enviar el correo
export async function enviarCorreo(destino, asunto, mensaje) {
    const opciones = {
        from: process.env.EMAIL_USER,
        to: destino,
        subject: asunto,
        text: mensaje
    }; 
    return transporter.sendMail(opciones);   
}

