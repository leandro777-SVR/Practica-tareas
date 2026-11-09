import express from 'express';
import cors from 'cors';
import tareasRoutes from './routes/tareas.routes.js';
import { noEncontrado, manejarErrores } from './middlewares/manejarErrores.js';

const app = express();

app.use(cors({
  //origin: 'http://localhost:9999'
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ estado: 'ok', mensaje: 'API de tareas funcionando' });
});

app.use('/api/tareas', tareasRoutes);

app.use(noEncontrado);
app.use(manejarErrores);

export default app;
