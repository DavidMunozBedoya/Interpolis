import { generarToken } from "../helpers/administrarToken.js";
import {
  getUsuariosDb,
  getUsuarioporIDDb,
  createUsuarioDb,
  updateUsuarioDb,
  deleteUsuarioDb,
  authenticacionUsuarioDb
} from "./usuario.model.js";

import { enviarCorreo } from "../../libs/mailer.js";
import { validarUsuario } from "../helpers/validaciones.js";

export async function getAllUsuarios(req, res) {
  try {
    const usuarios = await getUsuariosDb();
    res.status(200).send({
      status: "ok",
      data: usuarios,
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.code + "=>" + error.message,
    });
  }
}

export async function getUsuarioById(req, res) {
  try {
    const { id } = req.params;
    const usuario = await getUsuarioporIDDb(id);

    if (!usuario) {
      throw {
        status: "error",
        message: "usuario no encontrado",
        statusCode: 404,
      }
    }
    res.status(200).send({
      status: "ok",
      data: usuario,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.code + "=>" + error.message,
    });
  }
}

export async function createUsuario(req, res) {
  try {
    let data = req.body;
    // Validación usando helper
    const errores = validarUsuario(data);
    if (errores.length > 0) {
      res.status(400).send({
        status: "error",
        message: "Errores de validación",
        errors: errores
      });
      return;
    }
    
    const result = await createUsuarioDb(data);
    
    // Generar token para el nuevo usuario
    const token = generarToken({
      id: result.insertId,
      nombres: data.nombres,
      correo: data.correo
    }, process.env.TOKEN_LIFE);

    // Enviar correo de confirmación con el token
    if (!data.correo) {
      throw new Error("Correo no proporcionado");
    }

    await enviarCorreo(
      data.correo,
      "Bienvenido a Interpolice - Credenciales de Acceso",
      `Hola ${data.nombres},

Tu cuenta ha sido creada exitosamente en el sistema de Interpolice.

Datos de tu cuenta:
- Nombre: ${data.nombres} ${data.apellidos}
- Correo: ${data.correo}

Tu token de acceso es:
${token}

Por favor, guarda este token de forma segura. Lo necesitarás para acceder al sistema.

Para usar el token:
1. Ve a la página de inicio de sesión
2. Ingresa tu correo
3. Usa este token como tu credencial de acceso

Por seguridad, este token expirará en 2 horas.

¡Bienvenido al equipo!`
    );

    // Enviar respuesta al cliente
    res.status(200).send({
      status: "ok",
      data: result,
      token: token
    });

  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
  
}

export async function updateUsuario(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    // Validación usando helper
    const errores = validarUsuario(data);
    if (errores.length > 0) {
      res.status(400).send({
        status: "error",
        message: "Errores de validación",
        errors: errores
      });
      return;
    }
    // Si las validaciones pasan, se procede a actualizar el usuario
    const result = await updateUsuarioDb(id, data);
    if (result.affectedRows === 0) {
      throw {
        status: "error",
        message: "usuario no encontrado o no hubo cambios para actualizar.",
        statusCode: 404,
      };
    }
    res.status(200).send({
      status: "ok",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function deleteUsuario(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteUsuarioDb(id);
    if (result.affectedRows === 0) {
      throw {
        status: "error",
        message: "usuario no encontrado para eliminar.",
        statusCode: 404,
      };
    }
    res.status(200).send({
      status: "ok",
      message: "Usuario eliminado exitosamente.",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function authUsuario(req, res) {
  try {
    let data = req.body;
    // Validación usando helper (solo email y password)
    const errores = [];
    if (validator.isEmpty(data.email)) {
      errores.push({ campo: "email", mensaje: "El email es obligatorio." });
    } else if (!validator.isEmail(data.email)) {
      errores.push({ campo: "email", mensaje: "El email no es válido." });
    }
    if (validator.isEmpty(data.password)) {
      errores.push({ campo: "password", mensaje: "La contraseña es obligatoria." });
    }
    if (errores.length > 0) {
      res.status(400).send({
        status: "error",
        message: "Errores de validación",
        errors: errores
      });
      return;
    }

    const user = await authenticacionUsuarioDb(data);
    console.log(user);

    if (user) {
      const token = generarToken(user[0], process.env.TOKEN_LIFE);
      res.status(200).send({
        status: "ok",
        data: user[0].nombre,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}