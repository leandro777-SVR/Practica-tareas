Sistema de Gestión de Tareas

Aplicación web de gestión de tareas desarrollada como proyecto académico utilizando React, Vite, Node.js, Express y MySQL.

El sistema permite administrar tareas mediante una interfaz web conectada a una API REST. Los datos se almacenan en una base de datos MySQL, por lo que las operaciones realizadas permanecen guardadas incluso después de actualizar o cerrar el navegador.

---

1. Objetivo del proyecto

El objetivo es desarrollar una aplicación que permita gestionar tareas de manera sencilla, aplicando conceptos fundamentales del desarrollo web:

- Desarrollo de interfaces con React.
- Manejo de estados y componentes.
- Comunicación entre frontend y backend.
- Consumo de una API REST mediante "fetch".
- Creación de rutas y controladores con Express.
- Conexión y operaciones sobre una base de datos MySQL.
- Operaciones CRUD.
- Validación de datos y manejo de errores.

2. Tecnologías utilizadas

Tecnología| Función dentro del proyecto
React| Construcción de la interfaz de usuario.
Vite| Herramienta de desarrollo y ejecución del frontend.
JavaScript| Lenguaje utilizado para la lógica de la aplicación.
Node.js| Entorno que permite ejecutar JavaScript en el servidor.
Express| Framework utilizado para crear el backend y la API REST.
MySQL| Sistema gestor de base de datos.
MySQL2| Biblioteca para conectar Node.js con MySQL.
CSS| Diseño y presentación visual.
Fetch API| Comunicación HTTP entre frontend y backend.

3. Arquitectura del sistema

El proyecto utiliza una arquitectura cliente-servidor dividida en tres partes principales:

1. Frontend: es la interfaz con la que interactúa el usuario.
2. Backend: recibe las solicitudes del frontend, procesa la lógica y se comunica con la base de datos.
3. Base de datos: almacena permanentemente la información de las tareas.

Flujo general de comunicación

             USUARIO
                |
                v
       FRONTEND - REACT
       localhost:5173
                |
                | Fetch API / HTTP
                v
       BACKEND - EXPRESS
       localhost:3000
                |
                v
          CONTROLADORES
                |
                v
             MODELOS
                |
                | SQL
                v
          BASE DE DATOS
              MySQL
                |
                v
         RESPUESTA AL BACKEND
                |
                v
         RESPUESTA A REACT
                |
                v
       ACTUALIZACIÓN DE LA UI

Ejemplo: cuando el usuario marca una tarea como completada, React envía una petición HTTP al backend. Express recibe esa petición, el controlador ejecuta la operación correspondiente y el modelo actualiza el registro en MySQL. Finalmente, el servidor devuelve la tarea actualizada y React refleja el cambio en pantalla.

4. Estructura del proyecto

Frontend

frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Insignia.jsx
│   │   ├── ListaTareas.jsx
│   │   ├── Tarjeta.jsx
│   │   └── TareaItem.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── index.html

Responsabilidad de cada archivo:

- "main.jsx": punto de entrada de React. Renderiza la aplicación.
- "App.jsx": componente principal. Gestiona los estados, las solicitudes HTTP y las funciones principales.
- "components/": contiene los componentes reutilizables de la interfaz.
- "ListaTareas.jsx": recibe las tareas y genera la lista.
- "TareaItem.jsx": representa individualmente cada tarea y sus acciones.
- "Insignia.jsx": muestra visualmente el nivel de prioridad.
- "Tarjeta.jsx": proporciona una estructura visual reutilizable.
- "index.css": contiene los estilos generales de la aplicación.
- ".env": configura la dirección de la API que utiliza el frontend.

Backend

backend/
├── config/
│   └── db.js
├── controllers/
│   └── tareas.controller.js
├── models/
│   └── tareas.model.js
├── routes/
│   └── tareas.routes.js
├── middlewares/
├── app.js
├── server.js
├── .env
├── package.json
└── schema.sql

Responsabilidad de cada archivo:

- "server.js": inicia el servidor y establece el puerto de escucha.
- "app.js": configura Express, los middlewares y las rutas.
- "config/db.js": establece la conexión con MySQL.
- "routes/tareas.routes.js": define los endpoints disponibles.
- "controllers/tareas.controller.js": recibe las solicitudes, valida los datos y coordina las operaciones.
- "models/tareas.model.js": contiene las consultas SQL y la interacción directa con la base de datos.
- "middlewares/": contiene funciones intermedias para procesar solicitudes y manejar errores.
- "schema.sql": contiene la estructura SQL necesaria para crear la base de datos y sus tablas.

5. Operaciones principales: CRUD

CRUD es un acrónimo que representa las cuatro operaciones fundamentales para gestionar información:

Operación| Método HTTP| Función
Create| POST| Crear una tarea.
Read| GET| Consultar tareas.
Update| PUT / PATCH| Modificar una tarea.
Delete| DELETE| Eliminar una tarea.

Endpoints de la API

La dirección base de la API es:

http://localhost:3000/api

Método| Endpoint| Descripción
GET| "/api/tareas"| Obtiene todas las tareas.
GET| "/api/tareas/:id"| Obtiene una tarea por su ID.
GET| "/api/tareas/resumen"| Obtiene el resumen de tareas.
POST| "/api/tareas"| Crea una tarea nueva.
PUT| "/api/tareas/:id"| Actualiza los datos de una tarea.
PATCH| "/api/tareas/:id/completada"| Cambia su estado de completado.
DELETE| "/api/tareas/:id"| Elimina una tarea.

¿Cómo funciona cada operación?

Crear una tarea

1. El usuario ingresa un título y selecciona una prioridad.
2. React captura los datos mediante estados.
3. Se ejecuta una petición "POST" con "fetch".
4. Express recibe la solicitud.
5. El controlador valida los datos.
6. El modelo ejecuta el "INSERT" en MySQL.
7. El servidor devuelve la tarea creada.
8. React actualiza la lista.

Consultar tareas

1. React solicita los datos al backend mediante "GET".
2. El controlador solicita las tareas al modelo.
3. El modelo ejecuta una consulta "SELECT".
4. MySQL devuelve los registros.
5. Express responde con JSON.
6. React almacena los datos en su estado y los muestra.

Editar una tarea

1. El usuario selecciona la opción Editar.
2. Se obtiene el nuevo título.
3. React envía una petición "PUT".
4. El controlador valida los datos.
5. El modelo ejecuta una consulta "UPDATE".
6. El backend devuelve la tarea modificada.
7. React actualiza la interfaz.

Marcar una tarea como completada

1. El usuario selecciona el indicador de estado.
2. React envía una petición "PATCH".
3. El backend identifica la tarea mediante su ID.
4. El modelo modifica el campo correspondiente en MySQL.
5. El backend devuelve el estado actualizado.
6. React refleja el cambio visualmente.

Eliminar una tarea

1. El usuario selecciona Eliminar.
2. Se solicita confirmación.
3. React envía una petición "DELETE".
4. El controlador identifica la tarea.
5. El modelo ejecuta un "DELETE" en MySQL.
6. El backend responde con código HTTP "204".
7. React quita la tarea de la lista.

6. Conceptos importantes de React

Componentes

Un componente es una parte independiente y reutilizable de la interfaz.

Por ejemplo, "TareaItem.jsx" representa una tarea individual. React permite utilizarlo varias veces para mostrar todos los registros.

Props

Las props permiten enviar información y funciones desde un componente padre hacia uno hijo.

En este proyecto:

App.jsx
   |
   v
ListaTareas.jsx
   |
   v
TareaItem.jsx

"App.jsx" envía las tareas y las funciones para editarlas, eliminarlas o cambiar su estado.

useState

Es un Hook de React que permite almacenar y actualizar información dentro de un componente.

Ejemplo:

const [tareas, setTareas] = useState([]);

- "tareas": contiene el estado actual.
- "setTareas": permite actualizarlo.
- "[]": establece el valor inicial como un arreglo vacío.

Cuando se modifica el estado mediante su función correspondiente, React vuelve a renderizar los componentes que dependen de ese dato.

useEffect

Permite ejecutar efectos secundarios, como solicitar información a una API.

Ejemplo:

useEffect(() => {
  cargarTareas();
}, []);

El arreglo vacío indica que el efecto se ejecuta al montar el componente.

Cuando existen dependencias, el efecto vuelve a ejecutarse cuando cambia alguno de esos valores.

Fetch API

Permite realizar solicitudes HTTP desde el frontend hacia el backend.

Ejemplo:

const respuesta = await fetch(url);

if (!respuesta.ok) {
  throw new Error('Error en la solicitud');
}

const datos = await respuesta.json();

- "fetch()": realiza la solicitud.
- "await": espera el resultado de una operación asíncrona.
- "respuesta.ok": permite verificar si la respuesta HTTP fue exitosa.
- "respuesta.json()": convierte el cuerpo de la respuesta JSON en un objeto JavaScript.

async / await

Se utiliza para trabajar con operaciones asíncronas, como las solicitudes HTTP y las consultas a la base de datos.

Permite escribir código de forma más clara, evitando encadenar múltiples callbacks.

AbortController

Permite cancelar solicitudes HTTP que ya no son necesarias.

En este proyecto se utiliza para evitar que una consulta anterior siga ejecutándose cuando cambia el criterio de búsqueda o el componente necesita limpiar el efecto.

7. Conceptos importantes de Express y Node.js

Node.js

Es el entorno de ejecución que permite ejecutar JavaScript fuera del navegador, por ejemplo, en un servidor.

Express

Es un framework de Node.js que facilita la creación de servidores y APIs.

Permite definir rutas, procesar solicitudes HTTP y enviar respuestas al frontend.

Rutas

Las rutas determinan qué función debe ejecutarse según el método HTTP y la dirección solicitada.

Ejemplo:

router.get('/', controlador.listar);
router.post('/', controlador.crear);
router.put('/:id', controlador.actualizar);
router.patch('/:id/completada', controlador.alternar);
router.delete('/:id', controlador.eliminar);

Controladores

Son responsables de recibir las solicitudes, validar los datos, coordinar la operación y devolver una respuesta HTTP.

Modelos

Son responsables de interactuar con la base de datos y ejecutar las consultas SQL.

Esta separación permite organizar el código y evitar que toda la lógica quede concentrada en un único archivo.

8. Base de datos MySQL

MySQL almacena la información de manera persistente.

Esto significa que los datos no dependen únicamente del estado de React: permanecen almacenados en la base de datos.

La aplicación utiliza una base de datos llamada:

tareas_react

La tabla principal almacena la información de las tareas.

Entre los datos que administra el sistema se encuentran:

- ID de la tarea.
- Título.
- Descripción.
- Prioridad.
- Estado de completado.

La estructura exacta de columnas, tipos de datos y restricciones se encuentra definida en "schema.sql".

Consultas SQL utilizadas

Las operaciones CRUD se apoyan en instrucciones SQL:

-- Consultar tareas
SELECT * FROM tareas;

-- Crear una tarea
INSERT INTO tareas (titulo, prioridad)
VALUES ('Estudiar React', 'alta');

-- Actualizar una tarea
UPDATE tareas
SET titulo = 'Estudiar Express'
WHERE id = 1;

-- Eliminar una tarea
DELETE FROM tareas
WHERE id = 1;

Las consultas reales del proyecto se encuentran en "tareas.model.js".

9. Variables de entorno

Las variables de entorno permiten configurar datos de conexión sin escribirlos directamente en el código.

Frontend: ".env"

VITE_API_URL=http://localhost:3000/api

Backend: ".env"

PORT=3000
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_PASSWORD
DB_NAME=tareas_react

Importante: los valores son ejemplos de configuración local. Cada integrante debe utilizar sus propios datos de conexión. El archivo ".env" no debe subirse al repositorio si contiene credenciales.

10. Instalación y ejecución

Requisitos previos

- Node.js y npm.
- MySQL Server.
- MySQL Workbench (recomendado para administrar la base de datos).
- Visual Studio Code.

Paso 1. Crear la base de datos

Abrir MySQL Workbench y ejecutar el archivo "schema.sql".

Verificar que exista la base de datos "tareas_react" y que se haya creado la tabla correspondiente.

Paso 2. Configurar el backend

Abrir una terminal en la carpeta del backend:

npm install

Configurar el archivo ".env" con los datos de MySQL.

Iniciar el servidor:

npm run dev

Si la configuración es correcta, el backend quedará disponible en:

http://localhost:3000

Paso 3. Configurar el frontend

Abrir otra terminal en la carpeta del frontend:

npm install

Crear o configurar el archivo ".env":

VITE_API_URL=http://localhost:3000/api

Iniciar React:

npm run dev

Abrir en el navegador la dirección que proporciona Vite, normalmente:

http://localhost:5173

Nota: los comandos de ejecución dependen de los scripts definidos en cada "package.json". Si "npm run dev" no está disponible, revisar los scripts del proyecto.

11. Validaciones y manejo de errores

El sistema incorpora validaciones para evitar el ingreso de información incorrecta.

Por ejemplo:

- El título de una tarea es obligatorio.
- El título no puede superar los 200 caracteres.
- La prioridad debe ser una de las opciones permitidas: baja, media o alta.
- El ID debe ser un número entero positivo.
- Si una tarea no existe, el backend responde con un error "404".
- Si los datos enviados no son válidos, responde con "400".

También se utilizan bloques "try/catch" para manejar errores en operaciones asíncronas.

12. Códigos de respuesta HTTP

Código| Significado
200| Solicitud procesada correctamente.
201| Recurso creado correctamente.
204| Operación realizada sin contenido de respuesta.
400| Solicitud incorrecta o datos inválidos.
404| Recurso o ruta no encontrada.
500| Error interno del servidor.

13. ¿Por qué se utiliza esta arquitectura?

La separación entre frontend, backend y base de datos tiene varias ventajas:

- Organización: cada parte tiene una responsabilidad específica.
- Mantenimiento: es más sencillo encontrar y corregir errores.
- Reutilización: los componentes de React pueden utilizarse en distintas partes.
- Persistencia: MySQL conserva los datos aunque se cierre el navegador.
- Escalabilidad: permite agregar nuevas funcionalidades sin concentrar todo el código en un único archivo.
- Seguridad: el frontend no necesita conectarse directamente a MySQL ni conocer las credenciales de la base de datos.

14. Guía para explicar el proyecto en una exposición

Una forma clara de presentar el funcionamiento es seguir el recorrido de una operación real.

1. Presentación general

"Desarrollamos una aplicación web para gestionar tareas. Utilizamos React para el frontend, Express y Node.js para el backend, y MySQL para almacenar la información."

2. Explicar el frontend

"El frontend es la parte visual. Está desarrollado con React y dividido en componentes. Utilizamos estados para administrar la información que se muestra en pantalla y "useEffect" para cargar datos desde la API."

3. Explicar la comunicación

"Cuando el usuario realiza una acción, React utiliza Fetch API para enviar una solicitud HTTP al backend. Esa solicitud llega a una ruta definida en Express."

4. Explicar el backend

"El backend está organizado en rutas, controladores y modelos. Las rutas reciben las solicitudes, los controladores procesan y validan los datos y los modelos ejecutan las consultas SQL."

5. Explicar MySQL

"MySQL almacena las tareas. Cuando se crea, edita, completa o elimina una tarea, el backend ejecuta la operación correspondiente en la base de datos."

6. Explicar la persistencia

"Una parte importante del proyecto es que las operaciones no se realizan solamente en la interfaz. Cada modificación se envía al backend y se guarda en MySQL. Por eso, al actualizar el navegador, los cambios continúan presentes."

7. Cierre

"El proyecto nos permitió integrar tecnologías del desarrollo web moderno y comprender cómo se comunican una aplicación frontend, una API REST y una base de datos relacional."

---

15. Posibles mejoras futuras

Algunas funcionalidades que podrían incorporarse en futuras versiones son:

- Registro e inicio de sesión de usuarios.
- Tareas asociadas a cada usuario.
- Fechas límite y recordatorios.
- Categorías y etiquetas.
- Filtros avanzados y ordenamiento.
- Paginación.
- Confirmaciones visuales y notificaciones.
- Mejoras en la experiencia de usuario.
- Pruebas automatizadas.

---

Conclusión: este proyecto integra los conceptos de desarrollo frontend, backend, APIs REST y bases de datos relacionales en una aplicación funcional. Su arquitectura permite comprender el recorrido completo de la información, desde que el usuario realiza una acción hasta que los datos quedan almacenados en MySQL.
