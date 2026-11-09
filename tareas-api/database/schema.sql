CREATE DATABASE IF NOT EXISTS tareas_react
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tareas_react;

CREATE TABLE IF NOT EXISTS tareas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT NULL,
  prioridad ENUM('baja', 'media', 'alta') NOT NULL DEFAULT 'media',
  completada BOOLEAN NOT NULL DEFAULT FALSE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tareas (titulo, descripcion, prioridad, completada)
SELECT 'Instalar Node y MySQL', 'Verificar las versiones desde la terminal', 'alta', TRUE
WHERE NOT EXISTS (SELECT 1 FROM tareas WHERE titulo = 'Instalar Node y MySQL');

INSERT INTO tareas (titulo, descripcion, prioridad, completada)
SELECT 'Crear el proyecto con Vite', NULL, 'media', FALSE
WHERE NOT EXISTS (SELECT 1 FROM tareas WHERE titulo = 'Crear el proyecto con Vite');

INSERT INTO tareas (titulo, descripcion, prioridad, completada)
SELECT 'Leer sobre componentes', 'Props, estado y efectos', 'baja', FALSE
WHERE NOT EXISTS (SELECT 1 FROM tareas WHERE titulo = 'Leer sobre componentes');
