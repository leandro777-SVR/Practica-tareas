import pypandoc

readme = r"""# Practica-tareas

Aplicación web de gestión de tareas desarrollada con **React + Vite** en el frontend y **Node.js + Express + MySQL** en el backend.

Este repositorio contiene ambos proyectos para que puedas descargarlos, instalarlos y ejecutarlos localmente.

## Estructura del repositorio

```text
Practica-tareas/
├── tareas-api/       # API REST con Express y MySQL
└── tareas-web/       # Interfaz web con React y Vite
```

## Requisitos previos

Antes de comenzar, instalá:

- [Node.js](https://nodejs.org/) (incluye npm).
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/).
- Un editor de código, por ejemplo [Visual Studio Code](https://code.visualstudio.com/).
- [Git](https://git-scm.com/) (opcional, si vas a clonar el repositorio).

## 1. Descargar el proyecto

Podés descargarlo desde GitHub o clonar el repositorio desde una terminal:

```bash
git clone https://github.com/leandro777-SVR/Practica-tareas.git
cd Practica-tareas
```

## 2. Configurar la base de datos

1. Iniciá el servicio de MySQL.
2. Abrí MySQL Workbench o tu cliente de MySQL.
3. Ejecutá el contenido del archivo `tareas-api/database/schema.sql`.

Ese archivo crea la base de datos y la tabla necesarias para la aplicación.

La configuración utilizada por el proyecto es:

- Base de datos: `tareas_react`
- Puerto habitual de MySQL: `3306`

Si el archivo SQL no crea la base de datos automáticamente, ejecutá primero:

```sql
CREATE DATABASE tareas_react;
```

Luego seleccioná esa base y ejecutá el resto de `schema.sql`.

## 3. Configurar e iniciar el backend

Abrí una terminal dentro de `tareas-api`:

```bash
cd tareas-api
npm install
```

Creá un archivo llamado `.env` en esa carpeta. Podés tomar como referencia `.env.example` y completar los datos de tu instalación local:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA_DE_MYSQL
DB_NAME=tareas_react
```

Reemplazá `TU_CONTRASEÑA_DE_MYSQL` por la contraseña configurada en tu propio MySQL. No compartas ni subas tu archivo `.env`.

Iniciá el servidor:

```bash
npm run dev
```

La API quedará disponible en:

- `http://localhost:3000/api/health`
- `http://localhost:3000/api/tareas`

Mantené esta terminal abierta mientras uses la aplicación.

## 4. Configurar e iniciar el frontend

Abrí **otra terminal** en la carpeta `tareas-web`:

```bash
cd tareas-web
npm install
```

Creá un archivo `.env` dentro de `tareas-web` con esta variable:

```env
VITE_API_URL=http://localhost:3000/api
```

Iniciá Vite:

```bash
npm run dev
```

Abrí en el navegador la dirección que muestre la terminal. Normalmente es:

`http://localhost:5173`

Mantené también esta terminal abierta.

## 5. Orden de ejecución

Para que la aplicación funcione correctamente, deben estar activos:

1. MySQL.
2. El backend (`tareas-api`, puerto 3000).
3. El frontend (`tareas-web`, puerto 5173).

El frontend realiza solicitudes HTTP al backend, y el backend consulta o modifica los datos en MySQL.

## Funcionalidades

- Listar tareas desde la API.
- Buscar tareas por texto.
- Filtrar tareas por estado.
- Ordenar tareas por prioridad.
- Crear tareas y guardarlas en MySQL.
- Consultar el resumen de tareas: total, completadas y pendientes.
- Mostrar estados de carga y error.
- Cancelar solicitudes anteriores con `AbortController`.
- Aplicar debounce de 400 ms en el buscador.
- Reintentar la carga de tareas y del resumen cuando falla la conexión.
- Contador de clics para practicar estados en React.

**Nota:** en esta versión, la creación de tareas está conectada con la API y MySQL. Las acciones de completar, editar y eliminar que aparecen en la interfaz todavía actualizan el estado local del frontend; no están persistidas en la base de datos.

## Endpoints principales

La API utiliza la ruta base `http://localhost:3000/api`.

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Verificar que la API esté activa |
| GET | `/tareas` | Obtener tareas |
| GET | `/tareas?buscar=texto` | Buscar tareas |
| GET | `/tareas?completada=true` | Filtrar tareas completadas |
| GET | `/tareas/:id` | Obtener una tarea por ID |
| GET | `/tareas/resumen` | Obtener total, completadas y pendientes |
| POST | `/tareas` | Crear una tarea |
| PUT | `/tareas/:id` | Actualizar una tarea |
| PATCH | `/tareas/:id/completada` | Cambiar el estado de una tarea |
| DELETE | `/tareas/:id` | Eliminar una tarea |

## Problemas frecuentes

### El frontend muestra `Failed to fetch`

- Comprobá que el backend esté iniciado.
- Verificá que responda `http://localhost:3000/api/health`.
- Revisá que `VITE_API_URL` esté escrito correctamente en `tareas-web/.env`.
- Si modificaste un archivo `.env`, reiniciá el servidor de Vite.

### El backend no puede conectarse a MySQL

- Comprobá que MySQL esté iniciado.
- Revisá `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME` en `tareas-api/.env`.
- Verificá que hayas ejecutado `database/schema.sql`.

### No se encuentra un comando o paquete

Ejecutá `npm install` dentro de la carpeta del proyecto correspondiente (`tareas-api` o `tareas-web`).

## Tecnologías utilizadas

- JavaScript
- React
- Vite
- Node.js
- Express
- MySQL
- `mysql2`
- Fetch API
- Git y GitHub

## Repositorio

[https://github.com/leandro777-SVR/Practica-tareas](https://github.com/leandro777-SVR/Practica-tareas)
"""

output_path = "/mnt/data/README.md"
pypandoc.convert_text(
    readme,
    "md",
    format="md",
    outputfile=output_path,
    extra_args=["--standalone"]
)
print(f"Archivo creado: {output_path}")
