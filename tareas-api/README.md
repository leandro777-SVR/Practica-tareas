# tareas-api

API REST para administrar tareas usando Node.js, Express y MySQL.

## 1. Requisitos

- Node.js 18 o superior
- MySQL 8 o compatible
- npm

## 2. Crear la base de datos

Desde la carpeta raíz del proyecto, ejecutá:

```bash
mysql -u root -p < database/schema.sql
```

El script crea `tareas_react`, la tabla `tareas` y tres registros iniciales de ejemplo.

## 3. Crear el usuario de la aplicación

Entrá a MySQL como administrador:

```bash
mysql -u root -p
```

Luego ejecutá (reemplazá la contraseña por una propia):

```sql
CREATE USER 'tareas_app'@'localhost' IDENTIFIED BY 'una-clave-segura';
GRANT SELECT, INSERT, UPDATE, DELETE ON tareas_react.* TO 'tareas_app'@'localhost';
FLUSH PRIVILEGES;
```

Si el usuario ya existe, no repitas `CREATE USER`; actualizá su contraseña con `ALTER USER`.

## 4. Configurar variables de entorno

Copiá `.env.example` como `.env` y revisá los valores:

```bash
# Windows PowerShell
Copy-Item .env.example .env
```

```bash
# macOS / Linux
cp .env.example .env
```

Asegurate de que `DB_USER` y `DB_PASSWORD` coincidan con el usuario creado en MySQL.

## 5. Instalar y ejecutar

```bash
npm install
npm run dev
```

La API quedará disponible en `http://localhost:3000`.

## 6. Rutas disponibles

| Método | Ruta | Función |
|---|---|---|
| GET | `/api/health` | Comprobar que la API funciona |
| GET | `/api/tareas` | Listar todas las tareas |
| GET | `/api/tareas/:id` | Obtener una tarea |
| POST | `/api/tareas` | Crear una tarea |
| PUT | `/api/tareas/:id` | Actualizar título, descripción y prioridad |
| PATCH | `/api/tareas/:id/completada` | Alternar estado completada/pendiente |
| DELETE | `/api/tareas/:id` | Eliminar una tarea |

### Filtros para listar

- `/api/tareas?completada=true`
- `/api/tareas?completada=false`
- `/api/tareas?buscar=Node`
- `/api/tareas?completada=false&buscar=React`

### Ejemplo de POST / PUT

Enviar como JSON:

```json
{
  "titulo": "Estudiar React",
  "descripcion": "Practicar componentes y estados",
  "prioridad": "alta"
}
```

Los valores válidos de `prioridad` son `baja`, `media` y `alta`.

## 7. Probar desde JavaScript

```js
fetch('http://localhost:3000/api/tareas')
  .then((res) => {
    if (!res.ok) throw new Error('Error al consultar tareas');
    return res.json();
  })
  .then(console.log)
  .catch(console.error);
```

## Estructura

```text
tareas-api/
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── database/
│   └── schema.sql
└── src/
    ├── server.js
    ├── app.js
    ├── config/
    │   └── db.js
    ├── routes/
    │   └── tareas.routes.js
    ├── controllers/
    │   └── tareas.controller.js
    ├── models/
    │   └── tareas.model.js
    └── middlewares/
        └── manejarErrores.js
```
