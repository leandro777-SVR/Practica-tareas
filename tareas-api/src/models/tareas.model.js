import { pool } from '../config/db.js';

const COLUMNAS = 'id, titulo, descripcion, prioridad, completada, creado_en';

const normalizar = (tarea) => ({
  ...tarea,
  completada: Boolean(tarea.completada)
});

export async function listar({ buscar, completada } = {}) {
  let sql = `SELECT ${COLUMNAS} FROM tareas WHERE 1 = 1`;
  const parametros = [];

  if (completada === 'true' || completada === 'false') {
    sql += ' AND completada = ?';
    parametros.push(completada === 'true');
  }

  if (typeof buscar === 'string' && buscar.trim()) {
    sql += ' AND titulo LIKE ?';
    parametros.push(`%${buscar.trim()}%`);
  }

  sql += ' ORDER BY id DESC';
  const [filas] = await pool.query(sql, parametros);
  return filas.map(normalizar);
}

export async function obtenerPorId(id) {
  const [filas] = await pool.query(
    `SELECT ${COLUMNAS} FROM tareas WHERE id = ?`,
    [id]
  );
  return filas[0] ? normalizar(filas[0]) : null;
}

export async function crear({ titulo, descripcion, prioridad }) {
  const [resultado] = await pool.query(
    'INSERT INTO tareas (titulo, descripcion, prioridad) VALUES (?, ?, ?)',
    [titulo, descripcion, prioridad]
  );
  return obtenerPorId(resultado.insertId);
}

export async function actualizar(id, { titulo, descripcion, prioridad }) {
  const [resultado] = await pool.query(
    'UPDATE tareas SET titulo = ?, descripcion = ?, prioridad = ? WHERE id = ?',
    [titulo, descripcion, prioridad, id]
  );
  return resultado.affectedRows > 0 ? obtenerPorId(id) : null;
}

export async function alternarCompletada(id) {
  const [resultado] = await pool.query(
    'UPDATE tareas SET completada = NOT completada WHERE id = ?',
    [id]
  );
  return resultado.affectedRows > 0 ? obtenerPorId(id) : null;
}

export async function eliminar(id) {
  const [resultado] = await pool.query(
    'DELETE FROM tareas WHERE id = ?',
    [id]
  );
  return resultado.affectedRows > 0;
}

export async function obtenerResumen() {
  const [filas] = await pool.query(`
    SELECT
      COUNT(*) AS total,
      COALESCE(SUM(completada = 1), 0) AS completadas,
      COALESCE(SUM(completada = 0), 0) AS pendientes
    FROM tareas
  `);

  return {
    total: Number(filas[0].total),
    completadas: Number(filas[0].completadas),
    pendientes: Number(filas[0].pendientes)
  };
}