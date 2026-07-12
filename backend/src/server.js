import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import usuarioRoutes from './routes/usuario.routes.js';
import categoriaRoutes from './routes/categoria.routes.js';
import productoRoutes from './routes/producto.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'El servidor está funcionando correctamente',
    data: {
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    },
  });
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});