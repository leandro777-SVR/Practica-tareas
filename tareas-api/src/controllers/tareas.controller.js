import * as Tareas from '../models/tareas.model.js';

const PRIORIDADES = ['baja', 'media', 'alta'];

function validar(cuerpo) {
  const titulo = String(cuerpo.titulo ?? '').trim();
  const descripcion = String(cuerpo.descripcion ?? '').trim() || null;
  const prioridad = cuerpo.prioridad ?? 'media';

  if (!titulo) return { error: 'El título es obligatorio' };
  if (titulo.length > 200) {
    return { error: 'El título no puede superar los 200 caracteres' };
  }
  if (!PRIORIDADES.includes(prioridad)) {
    return { error: 'La prioridad no es válida' };
  }

  return { datos: { titulo, descripcion, prioridad } };
}

function leerId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({ error: 'Id inválido' });
    return null;
  }
  return id;
}

export async function listar(req, res, next) {
  try {
    res.json(await Tareas.listar(req.query));
  } catch (error) {
    next(error);
  }
}

export async function obtener(req, res, next) {
  try {
    const id = leerId(req, res);
    if (id === null) return;

    const tarea = await Tareas.obtenerPorId(id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
  } catch (error) {
    next(error);
  }
}

export async function crear(req, res, next) {
  try {
    const { datos, error } = validar(req.body ?? {});
    if (error) return res.status(400).json({ error });

    const tarea = await Tareas.crear(datos);
    res.status(201).json(tarea);
  } catch (error) {
    next(error);
  }
}

export async function actualizar(req, res, next) {
  try {
    const id = leerId(req, res);
    if (id === null) return;

    const { datos, error } = validar(req.body ?? {});
    if (error) return res.status(400).json({ error });

    const tarea = await Tareas.actualizar(id, datos);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
  } catch (error) {
    next(error);
  }
}

export async function alternar(req, res, next) {
  try {
    const id = leerId(req, res);
    if (id === null) return;

    const tarea = await Tareas.alternarCompletada(id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
  } catch (error) {
    next(error);
  }
}

export async function eliminar(req, res, next) {
  try {
    const id = leerId(req, res);
    if (id === null) return;

    const eliminada = await Tareas.eliminar(id);
    if (!eliminada) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}


// Obtener resumen de todas las tareas
export async function resumen(req, res, next) {
  try {
    const resultado = await Tareas.obtenerResumen();
    res.json(resultado);
  } catch (error) {
    next(error);
  }
}