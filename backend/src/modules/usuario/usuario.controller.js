import{
    getUsuariosDb,
    getUsuarioporIDDb,
    createUsuarioDb,
    updateUsuarioDb,
    deleteUsuarioDb,
    authenticacionUsuarioDb
} from "./usuario.model.js";

export async function getAllUsuarios(req, res) {
  try {
    const usuarios = await getUsuariosDb();
    res.status(200).send({
        status: "ok",
        data:  usuarios,
    })
  } catch (error) {
    res.status(500).send({ 
        status: "error",
        message: error.code + "=>" + error.message,
    });
  }
}

export async function getUsuarioById(req, res) {
    try{
        const { id } = req.params;
        const usuario = await getUsuarioporIDDb(id);
        if(!usuario){
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
    }catch(error){
        res.status(500).send({
            status: "error",
            message: error.code + "=>" + error.message,
        }); 
    }
}

export async function createUsuario(req, res) {
    try {
    let data = req.body;
    // Aquí debes añadir validaciones de entrada de datos --- passport-u otra libreria  !!!!!

    const result = await createUsuarioDb(data);
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

export async function updateUsuario(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;
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
    // Aquí debes añadir validaciones de entrada de datos --- passport-u otra libreria  !!!!!

    const result = await authenticacionUsuarioDb(data);
    console.log(result);
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