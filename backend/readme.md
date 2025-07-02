1. backend de la aplicacion:
- iniciamos npm - npm init
- instalamos los paquetes o dependencias necesarias: express, cors, nodemon, mysql
- añadimos al package.json "type": "module", y en el script: "start": "nodemon index.js",
- instalacion dotenv para las variables globales

- creacion del archivo .env para agregar los datos de la base de datos 
- creacion carpeta src y dentro de esta el archivo dbConexion.js
- prueba de la conexion de la api y la base de datos npm start

- cracion del modulo en src gestionCiudadanos
- en el modulo importamos express y la conexion 
- creacion de los endpoint listar, modificar, crear y eliminacion logica.

- prueba en postman de los endpoints y guardado.

2. fronend de la aplicacion
- 