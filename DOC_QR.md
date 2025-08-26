# Documentación: Generación y Almacenamiento de Códigos QR para Ciudadanos

## Objetivo
Generar automáticamente un código QR con los datos de cada ciudadano al momento de crear o actualizar un registro, guardar la imagen en el servidor y almacenar la ruta en la base de datos.

---

## Archivos Involucrados

- `backend/src/modules/ciudadano/ciudadano.controller.js`  
  Lógica para crear y actualizar ciudadanos, generación y almacenamiento del QR.
- `backend/src/modules/ciudadano/ciudadano.model.js`  
  Funciones para interactuar con la base de datos.
- `backend/index.js`  
  Configuración de rutas estáticas para servir los QR.
- `backend/public/qrcodes/`  
  Carpeta donde se almacenan los archivos PNG de los QR.

---

## Paso a Paso

### 1. Instalación de la librería QRCode

En la carpeta `backend` ejecuta:
```bash
npm install qrcode
```

### 2. Configuración de la carpeta de almacenamiento

Asegúrate de tener la carpeta `public/qrcodes` en tu backend. Si no existe, se crea automáticamente desde el código.

### 3. Generación del QR en el Controller

En `ciudadano.controller.js`, en las funciones `createNuevoRegistro` y `updateRegistro`:

- Se valida la información del ciudadano.
- Se genera un string JSON con todos los datos relevantes del ciudadano:
  ```js
  const qrText = JSON.stringify({
    nombre: data.nombre,
    apellidos: data.apellidos,
    apodo_nickname: data.apodo_nickname,
    fecha_nacimiento: data.fecha_nacimiento,
    planeta_origen: data.planeta_origen,
    planeta_residencia: data.planeta_residencia,
    foto: data.foto,
  });
  ```
- Se define la ruta y el nombre del archivo QR:
  ```js
  const qrDir = path.join(process.cwd(), "public", "qrcodes");
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir, { recursive: true });
  }
  const qrFileName = `${codigo}_qr_${Date.now()}.png`;
  const qrFilePath = path.join(qrDir, qrFileName);
  ```
- Se genera y guarda el QR:
  ```js
  await QRCode.toFile(qrFilePath, qrText);
  ```
- Se almacena la ruta relativa en el campo `codigo_qr` del ciudadano:
  ```js
  data.codigo_qr = `/codigo_qr/${qrFileName}`;
  ```
- Finalmente, se guarda o actualiza el ciudadano en la base de datos.

### 4. Configuración de la ruta estática en Express

En `index.js`:
```js
app.use("/codigo_qr", express.static("public/qrcodes"));
```
Esto permite acceder a los QR desde el navegador o el frontend usando la ruta almacenada en la base de datos.

---

## Comentarios Explicativos

- **¿Por qué guardar el QR como archivo?**
  - Permite compartir, descargar o mostrar el QR fácilmente desde el frontend.
- **¿Por qué guardar la ruta en la base de datos?**
  - Así puedes acceder al QR de cada ciudadano sin tener que regenerarlo cada vez.
- **¿Por qué el nombre del archivo incluye el código y la fecha?**
  - Para evitar sobrescribir archivos y asegurar unicidad.
- **¿Qué datos contiene el QR?**
  - Todos los datos relevantes del ciudadano en formato JSON.

---

## Resumen del flujo
1. El usuario crea o actualiza un ciudadano.
2. El backend valida los datos.
3. Se genera un QR con todos los datos del ciudadano.
4. El QR se guarda en `public/qrcodes`.
5. La ruta del QR se almacena en la base de datos.
6. El QR es accesible desde el frontend usando la ruta guardada.

---

