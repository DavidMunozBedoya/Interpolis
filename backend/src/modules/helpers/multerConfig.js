import multer from "multer";
import path from "path";


// configuracion 
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "public", "fotos"));
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        // Usar el nombre del ciudadano, en minúsculas, sin espacios ni caracteres especiales
        let nombreCiudadano = req.body.nombre || "foto";
        nombreCiudadano = nombreCiudadano.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
        const nombreArchivo = `${nombreCiudadano}_${Date.now()}${extension}`;
        cb(null, nombreArchivo);
    }
});

export const subirFoto = multer({ storage: almacenamiento });
