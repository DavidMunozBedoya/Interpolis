import dbconn from "../../config/dbConexion.js";
import bcrypt from "bcryptjs";

export async function getUsuariosDb() {
    const [rows] = await dbconn.query("SELECT * FROM usuario");
    return rows;
}

export async function getUsuarioporIDDb(id) {
    const [rows] = await dbconn.query("SELECT * FROM usuario WHERE idusuario = ?", [id]);
    return rows[0];
}

export async function createUsuarioDb(usuarioData) {
    let correo = usuarioData.correo;
    let password = usuarioData.password;

    const [correoExistente] = await dbconn.query(
        "SELECT * FROM usuario WHERE correo = ?", [correo]);

    if (correoExistente.length > 0) {
        throw new Error("El correo ya está en uso");
    }

    const usuarioNuevo = {
        nombres: usuarioData.nombres,
        apellidos: usuarioData.apellidos,
        correo: usuarioData.correo,
        password: bcrypt.hashSync(usuarioData.password, 11),
        rol_idrol: usuarioData.rol_idrol,
        estado_idestado: usuarioData.estado_idestado,
    };

    const [result] = await dbconn.query("INSERT INTO usuario SET ?", [usuarioNuevo]);
    return result;
}

export async function updateUsuarioDb(id, usuarioData) {
    // encriptacion de la contraseña si se proporciona o se actualiza
    if(usuarioData.password && usuarioData.password !== "") {
        usuarioData.password = bcrypt.hashSync(usuarioData.password, 11);
    }
    const [result] = await dbconn.query("UPDATE usuario SET ? WHERE idusuario = ?", [usuarioData, id]);
    return result;
}

export async function deleteUsuarioDb(id) {
    const [result] = await dbconn.query("DELETE FROM usuario WHERE idusuario = ?", [id]);
    return result;
}

export async function authenticacionUsuarioDb(usuarioData) {
    let correo = usuarioData.correo;
    let password = usuarioData.password;

    const [consultaRegistro] = await dbconn.query(
        "SELECT * FROM usuario WHERE correo = ?", [correo]);

    if (consultaRegistro.length > 0) {
        const siCoincide = bcrypt.compareSync(
            password,
            consultaRegistro[0].password
        );

        if (siCoincide) {
            return consultaRegistro;
        } else {
            throw new Error("Contraseña incorrecta");
        }
    } else {
        throw new Error("Usuario no encontrado");
    }
}