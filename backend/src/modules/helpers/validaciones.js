import e from "cors";
import validator from "validator";

export function validarCiudadano(data) {
    const errores = [];
    // Nombre
    if (validator.isEmpty(data.nombre)) {
        errores.push({ campo: "nombre", mensaje: "El nombre es obligatorio." });
    } else if (!validator.isAlpha(data.nombre, 'es-ES', { ignore: " " })) {
        errores.push({ campo: "nombre", mensaje: "El nombre solo puede contener letras." });
    }
    // Apellidos
    if (!validator.isAlpha(data.apellidos, 'es-ES', { ignore: " " })) {
        errores.push({ campo: "apellidos", mensaje: "Los apellidos solo pueden contener letras." });
    }
    // Apodo
    if (validator.isAlpha(data.apodo_nickname, 'es-ES', { ignore: " " }) === false) {
        errores.push({ campo: "apodo_nickname", mensaje: "El apodo solo puede contener letras." });
    }
    // Fecha de nacimiento
    if (validator.isEmpty(data.fecha_nacimiento)) {
        errores.push({ campo: "fecha_nacimiento", mensaje: "La fecha de nacimiento es obligatoria." });
    } else if (!validator.isDate(data.fecha_nacimiento)) {
        errores.push({ campo: "fecha_nacimiento", mensaje: "La fecha de nacimiento no es válida." });
    }
    // Planeta origen
    if (validator.isEmpty(data.planeta_origen)) {
        errores.push({ campo: "planeta_origen", mensaje: "El planeta de origen es obligatorio." });
    } else if (!validator.isAlpha(data.planeta_origen, 'es-ES', { ignore: " " })) {
        errores.push({ campo: "planeta_origen", mensaje: "El planeta de origen solo puede contener letras." });
    }
    // Planeta residencia
    if (validator.isEmpty(data.planeta_residencia)) {
        errores.push({ campo: "planeta_residencia", mensaje: "El planeta de residencia es obligatorio." });
    } else if (!validator.isAlpha(data.planeta_residencia, 'es-ES', { ignore: " " })) {
        errores.push({ campo: "planeta_residencia", mensaje: "El planeta de residencia solo puede contener letras." });
    }
    // Foto
    if (!data.foto || typeof data.foto !== "string") {
        errores.push({ campo: "foto", mensaje: "La foto es obligatoria." });
    } else {
        // Permitir URL o ruta local que termine en .jpg, .jpeg, .png
        const esUrl = validator.isURL(data.foto);
        const esArchivoImagen = /\.(jpg|jpeg|png)$/i.test(data.foto);
        if (!esUrl && !esArchivoImagen) {
            errores.push({ campo: "foto", mensaje: "La foto debe ser una URL válida o una imagen jpg/jpeg/png." });
        }
    }
    
    return errores;
}


export function validarUsuario(data) {
    const errores = [];
    // Nombre
    if (validator.isEmpty(data.nombres)) {
        errores.push({ campo: "nombres", mensaje: "El nombre es obligatorio." });
    } else if (!validator.isAlpha(data.nombres, 'es-ES', { ignore: " " })) {
        errores.push({ campo: "nombres", mensaje: "El nombre solo puede contener letras." });
    }
    // Apellidos
    if (validator.isEmpty(data.apellidos)) {
        errores.push({ campo: "apellidos", mensaje: "El apellido es obligatorio." });
    } else if (!validator.isAlpha(data.apellidos, 'es-ES', { ignore: " " })) {
        errores.push({ campo: "apellidos", mensaje: "El apellido solo puede contener letras." });
    }
    // Email
    if (validator.isEmpty(data.correo)) {
        errores.push({ campo: "correo", mensaje: "El correo es obligatorio." });
    } else if (!validator.isEmail(data.correo)) {
        errores.push({ campo: "correo", mensaje: "El correo no es válido." });
    }
    // Password
    if (validator.isEmpty(data.password)) {
        errores.push({ campo: "password", mensaje: "La contraseña es obligatoria." });
    }
    return errores;
}

export function validarDelito(data) {
    //delito descripcion_delito sancion
    const errores = [];
    //Delito
    if(validator.isEmpty(data.delito)) {
        errores.push({ campo: "delito", mensaje: "El delito es obligatorio." });
    } else if (validator.isAlpha(data.delito, 'es-ES', { ignore: " " }) === false) {
        errores.push({ campo: "delito", mensaje: "El delito solo puede contener letras." });
    }
    //Descripcion
    if(validator.isEmpty(data.descripcion_delito)) {
        errores.push({ campo: "descripcion_delito", mensaje: "La descripción del delito es obligatoria." });
    } else if (validator.isAlpha(data.descripcion_delito, 'es-ES', { ignore: " " }) === false) {
        errores.push({ campo: "descripcion_delito", mensaje: "La descripción del delito solo puede contener letras." });
    }
    //Sancion
    if(validator.isEmpty(data.sancion)) {
        errores.push({ campo: "sancion", mensaje: "La sanción es obligatoria." });
    }
    return errores;
}

export function validarEstado(data) {
    const errores = [];
    
    if (validator.isEmpty(data.nombre_estado)) {
        errores.push({ campo: "nombre_estado", mensaje: "El nombre del estado es obligatorio." });
    } else if (!validator.isAlpha(data.nombre_estado, 'es-ES', { ignore: " " })) {
        errores.push({ campo: "nombre_estado", mensaje: "El nombre del estado solo puede contener letras." });
    }

    return errores;
}

export function validarAmonestacion(data) {
    const errores = [];
    
    // Validar código de ciudadano
    if (validator.isEmpty(data.codigo_ciudadano)) {
        errores.push({ campo: "codigo_ciudadano", mensaje: "El código del ciudadano es obligatorio." });
    }

    // Validar fecha
    if (validator.isEmpty(data.fecha)) {
        errores.push({ campo: "fecha", mensaje: "La fecha de la amonestación es obligatoria." });
    }

    // Validar el motivo
    if (validator.isEmpty(data.motivo)) {
        errores.push({ campo: "motivo", mensaje: "El motivo de la amonestación es obligatorio." });
    }

    // Validar nivel de amonestación
    if (validator.isEmpty(data.nivel_amonestacion)) {
        errores.push({ campo: "nivel_amonestacion", mensaje: "El nivel de amonestación es obligatorio." });
    } else if (!validator.isNumeric(data.nivel_amonestacion)) {
        errores.push({ campo: "nivel_amonestacion", mensaje: "El nivel de amonestación debe ser un número." });
    }

    // Validar valor multa
    if (!validator.isEmpty(data.valor_multa) && !validator.isNumeric(data.valor_multa.toString())) {
        errores.push({ campo: "valor_multa", mensaje: "El valor de la multa debe ser un número válido." });
    }

    // Validar curso cívico
    if (!validator.isEmpty(data.curso_civico) && !validator.isNumeric(data.curso_civico.toString())) {
        errores.push({ campo: "curso_civico", mensaje: "El curso cívico debe ser un número válido." });
    }

    // Validar trabajo cívico días
    if (!validator.isEmpty(data.trabajo_civico_dias) && !validator.isNumeric(data.trabajo_civico_dias.toString())) {
        errores.push({ campo: "trabajo_civico_dias", mensaje: "Los días de trabajo cívico deben ser un número válido." });
    }

    // Validar días de cárcel
    if (!validator.isEmpty(data.carcel_dias) && !validator.isNumeric(data.carcel_dias.toString())) {
        errores.push({ campo: "carcel_dias", mensaje: "Los días de cárcel deben ser un número válido." });
    }

    // Validar convierte antecedente
    if (validator.isEmpty(data.convierte_antecedente)) {
        errores.push({ campo: "convierte_antecedente", mensaje: "Debe especificar si convierte a antecedente." });
    } else if (!validator.isNumeric(data.convierte_antecedente)) {
        errores.push({ campo: "convierte_antecedente", mensaje: "El valor de convierte antecedente debe ser 0 o 1." });
    }

    return errores;
}

export function validarEstadoDelito(data) {
    const errores = [];

    
    if (!data.delito_iddelito) {
        errores.push({ campo: "delito_iddelito", mensaje: "El ID del delito es obligatorio." });
    }
    if (validator.isEmpty(data.fecha_estado)) {
        errores.push({ campo: "fecha_estado", mensaje: "La fecha de registro es obligatoria." });
    } else if (!validator.isDate(data.fecha_estado)) {
        errores.push({ campo: "fecha_estado", mensaje: "La fecha de registro no es válida." });
    }

    return errores;
}

export function validarEstadoProcesal(data) {
    const errores = [];

    if (validator.isEmpty(data.nombre_estado)) {
        errores.push({ campo: "nombre_estado", mensaje: "El nombre del estado procesal es obligatorio." });
    } else if (!validator.isAlpha(data.nombre_estado, 'es-ES', { ignore: " " })) {
        errores.push({ campo: "nombre_estado", mensaje: "El nombre solo puede contener letras." });
    }
    if(validator.isEmpty(data.es_antecedente)) {
        errores.push({ campo: "es_antecedente", mensaje: "El estado procesal debe indicar si es antecedente." });
    }

    return errores;
}

export function validarHechoPunible(data) {
    const errores = [];

    if (validator.isEmpty(data.descripcion)) {
        errores.push({ campo: "descripcion", mensaje: "La descripción del hecho punible es obligatoria." });
    }

    if(validator.isEmpty(data.hora_hecho)) {
        errores.push({ campo: "hora_hecho", mensaje: "La hora del hecho es obligatoria." });
        } else if (!/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(data.hora_hecho)) {
        errores.push({ campo: "hora_hecho", mensaje: "La hora del hecho debe tener el formato HH:mm:ss." });
        errores.push({ campo: "hora_hecho", mensaje: "La hora del hecho no es válida." });
    }

    if (validator.isEmpty(data.fecha_suceso)) {
        errores.push({ campo: "fecha_suceso", mensaje: "La fecha del hecho es obligatoria." });
    } else if (!validator.isDate(data.fecha_suceso)) {
        errores.push({ campo: "fecha_suceso", mensaje: "La fecha del hecho no es válida." });
    }

    if (validator.isEmpty(data.lugar_hecho)) {
        errores.push({ campo: "lugar_hecho", mensaje: "El lugar del hecho es obligatorio." });
    }

    if (validator.isEmpty(data.usuario_idusuario)) {
        errores.push({ campo: "usuario_idusuario", mensaje: "El ID del usuario es obligatorio." });
    }

    return errores;
}

export function validarRol(data) {
    const errores = [];

    if (validator.isEmpty(data.nombre_rol)) {
        errores.push({ campo: "nombre_rol", mensaje: "El nombre del rol es obligatorio." });
    } else if (!validator.isAlpha(data.nombre_rol, 'es-ES', { ignore: " " })) {
        errores.push({ campo: "nombre_rol", mensaje: "El nombre solo puede contener letras." });
    }


    return errores;
}

export function validarCiudadanoHechoDelito(data) {
    const errores = [];

    if (!data.codigo_ciudadano) {
        errores.push({ campo: "codigo_ciudadano", mensaje: "El ID del ciudadano es obligatorio." });
    }
    if (!data.idhecho_punible) {
        errores.push({ campo: "idhecho_punible", mensaje: "El ID del hecho punible es obligatorio." });
    }
    if (!data.iddelito) {
        errores.push({ campo: "iddelito", mensaje: "El ID del delito es obligatorio." });
    }
    
    

    return errores;
}

