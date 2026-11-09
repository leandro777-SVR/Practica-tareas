import 'dotenv/config';
import app from './app.js';
import { probarConexion, pool } from './config/db.js';

const PORT = Number(process.env.PORT) || 3000;

try {
  await probarConexion();
  app.listen(PORT, () => {
    console.log(`API en http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('No se pudo conectar a MySQL:', error.message);
  await pool.end();
  process.exit(1);
}
