import { Router } from 'express';
import * as controlador from '../controllers/tareas.controller.js';

const router = Router();

router.get('/', controlador.listar);

// NUEVO ENDPOINT: resumen de tareas
router.get('/resumen', controlador.resumen);

router.get('/:id', controlador.obtener);
router.post('/', controlador.crear);
router.put('/:id', controlador.actualizar);
router.patch('/:id/completada', controlador.alternar);
router.delete('/:id', controlador.eliminar);

export default router;