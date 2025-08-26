# 🌟 LABORATORIO INTERPOLIS - Guía de Construcción Fullstack

## 🏗️ Estructura del Proyecto

```
LABORATORIO_INTERPOLIS/
├── package.json (dependencias compartidas)
├── backend/ (API REST con Node.js)
├── frontend/ (Cliente con Vite)
└── assets/ (recursos estáticos)
```

---

## 🚀 PASO A PASO: CONSTRUCCIÓN DESDE CERO

### **FASE 1: CONFIGURACIÓN INICIAL**

#### 1.1 Crear la estructura base
1. Crear carpeta principal del proyecto
```powershell
mkdir LABORATORIO_INTERPOLIS
cd LABORATORIO_INTERPOLIS
```

2. Inicializar Git en la carpeta principal
```powershell
git init
```

3. Crear las subcarpetas: `backend/`, `frontend/`, `assets/`
```powershell
mkdir backend, frontend, assets
```

4. Crear `package.json` en la raíz para dependencias compartidas
```powershell
npm init -y
```

### **FASE 2: DESARROLLO DEL BACKEND**

#### 2.1 Inicializar proyecto Node.js
1. Navegar a la carpeta `backend/`
```powershell
cd backend
```

2. Ejecutar `npm init -y`
```powershell
npm init -y
```

3. Instalar dependencias principales:
```powershell
npm install express mysql2 cors bcryptjs jsonwebtoken dotenv
```

4. Instalar dependencias de desarrollo:
```powershell
npm install -D nodemon
```

#### 2.2 Configurar estructura del backend
1. Crear archivo principal `index.js`
```powershell
New-Item -ItemType File -Name "index.js"
```

2. Crear carpeta `src/` con subcarpetas:
```powershell
mkdir src
mkdir src\config, src\modules, src\modules\ciudadano, src\modules\usuario, src\modules\helpers
```

#### 2.3 Implementar configuración
1. Crear archivo de conexión a base de datos en `config/dbConexion.js`
```powershell
New-Item -ItemType File -Path "src\config\dbConexion.js"
```

2. Configurar variables de entorno en archivo `.env`
```powershell
New-Item -ItemType File -Name ".env"
```

3. Configurar CORS y middleware en `index.js`

#### 2.4 Desarrollar módulo de ciudadanos
1. Crear archivos del módulo ciudadano:
```powershell
New-Item -ItemType File -Path "src\modules\ciudadano\ciudadano.model.js"
New-Item -ItemType File -Path "src\modules\ciudadano\ciudadano.controller.js"
New-Item -ItemType File -Path "src\modules\ciudadano\ciudadano.routers.js"
```

2. Implementar métodos en el modelo:
   - listar todos los ciudadanos
   - crear nuevo ciudadano
   - modificar ciudadano existente
   - eliminación lógica (cambiar estado a muerto)

3. Crear controlador para manejar requests

4. Crear rutas para endpoints:
   - GET `/listarciudadanos`
   - POST `/crearRegistro`
   - PUT `/modificar/:codigo`
   - PUT `/eliminacionLogica/:codigo`

#### 2.6 Configurar scripts de desarrollo
1. Añadir scripts en `package.json`:
   - `start`: ejecutar con nodemon
   - `dev`: modo desarrollo

---

### **FASE 3: DESARROLLO DEL FRONTEND**

#### 3.1 Inicializar proyecto Vite
1. Navegar a la carpeta `frontend/`
```powershell
cd ..\frontend
```

2. Crear proyecto Vite vanilla JavaScript
```powershell
npm create vite@latest . -- --template vanilla
```

3. Instalar dependencias base:
```powershell
npm install
```

4. Instalar dependencias adicionales:
```powershell
npm install bootstrap sweetalert2 sass
```

#### 3.2 Configurar estructura del frontend
1. Crear archivos HTML:
```powershell
New-Item -ItemType File -Name "ciudadanos.html"
```

2. Crear carpetas y archivos en `src/`:
```powershell
mkdir src\js, src\scss
New-Item -ItemType File -Path "src\api.js"
New-Item -ItemType File -Path "src\js\main.js"
New-Item -ItemType File -Path "src\js\ciudadanos.js"
New-Item -ItemType File -Path "src\scss\style.scss"
```

#### 3.3 Implementar páginas
1. **Página de login** (`index.html`):
   - Formulario de autenticación
   - Validación de credenciales
   - Redirección tras login exitoso
2. **Página de ciudadanos** (`ciudadanos.html`):
   - Tabla para mostrar ciudadanos
   - Modal para crear/editar ciudadanos
   - Botones de acción (editar/eliminar)

#### 3.4 Desarrollar lógica JavaScript
1. **main.js**: lógica de login y autenticación
2. **ciudadanos.js**: gestión completa de ciudadanos
   - Cargar lista de ciudadanos
   - Crear nuevos registros
   - Editar registros existentes
   - Eliminación lógica
   - Manejo de formularios y validaciones

#### 3.5 Implementar estilos
1. Configurar Bootstrap para componentes base
2. Crear estilos personalizados en SCSS
3. Hacer responsive la aplicación

#### 3.6 Configurar Vite
1. Configurar `vite.config.js` para desarrollo
2. Configurar scripts en `package.json`:
   - `dev`: servidor de desarrollo
   - `build`: compilar para producción
   - `preview`: previsualizar build

---

### **FASE 4: INTEGRACIÓN Y TESTING**

#### 4.1 Conectar frontend y backend
1. Configurar URLs de API en el frontend
2. Implementar manejo de errores y estados de carga
3. Probar todas las operaciones CRUD

#### 4.2 Implementar autenticación completa
1. Proteger rutas del backend con JWT
2. Manejar tokens en el frontend
3. Implementar logout y expiración de sesión

#### 4.3 Validaciones y seguridad
1. Validar datos en frontend y backend
2. Sanitizar inputs para prevenir inyecciones
3. Manejar errores de conexión y timeout

---

### **FASE 5: DESPLIEGUE Y PRODUCCIÓN**

#### 5.1 Preparar para producción
1. Configurar variables de entorno para producción
2. Compilar frontend con `npm run build`
```powershell
cd frontend
npm run build
```

3. Optimizar queries de base de datos

#### 5.2 Testing final
1. Probar todas las funcionalidades
2. Verificar responsividad en diferentes dispositivos
3. Probar manejo de errores

---

## 🔧 Comandos de Instalación Completa

### Instalación desde cero:
```powershell
# 1. Crear proyecto
mkdir LABORATORIO_INTERPOLIS
cd LABORATORIO_INTERPOLIS
git init
mkdir backend, frontend, assets
npm init -y

# 2. Configurar backend
cd backend
npm init -y
npm install express mysql2 cors bcryptjs jsonwebtoken dotenv
npm install -D nodemon
mkdir src
mkdir src\config, src\modules, src\modules\ciudadano, src\modules\usuario, src\modules\helpers

# 3. Configurar frontend
cd ..\frontend
npm create vite@latest . -- --template vanilla
npm install
npm install bootstrap sweetalert2 sass
mkdir src\js, src\scss

# 4. Volver a la raíz
cd ..
```

## 🔧 Comandos Principales

### Backend
```powershell
cd backend
npm install
npm run dev
```

### Frontend
```powershell
cd frontend
npm install
npm run dev
```

## 🌐 URLs de Desarrollo
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4100

## 📝 Funcionalidades Principales
- ✅ Autenticación de usuarios con JWT
- ✅ CRUD completo de ciudadanos
- ✅ Eliminación lógica (cambio de estado)
- ✅ Interfaz responsive con Bootstrap
- ✅ Validaciones en frontend y backend
- ✅ Alertas interactivas con SweetAlert2

## 🛠️ Tecnologías Utilizadas
- **Backend**: Node.js, Express, MySQL
- **Frontend**: Vite, JavaScript Vanilla, Bootstrap
- **Autenticación**: JWT + bcrypt
- **Base de datos**: MySQL
- **Herramientas**: nodemon, SweetAlert2, SASS

---

## 📚 Notas Importantes

1. **Orden de desarrollo**: Siempre desarrollar primero el backend y luego el frontend
2. **Testing**: Probar cada endpoint del backend antes de implementar en frontend
3. **Seguridad**: Never hardcodear credenciales, usar variables de entorno
4. **Versionado**: Hacer commits frecuentes durante el desarrollo
5. **Documentación**: Documentar todos los endpoints y funciones principales

¡Feliz coding! 🚀
