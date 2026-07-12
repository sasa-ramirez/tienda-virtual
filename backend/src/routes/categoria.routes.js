import { Router } from 'express';
import categoriaController from '../controllers/categoria.controller.js';
import categoriaValidator from '../validators/categoria.validator.js';
import manejarErroresValidacion from '../middlewares/validacion.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

const ROL_ADMIN = 1;

// Rutas públicas
router.get('/', categoriaController.listarTodas);
router.get('/:id', categoriaController.obtenerPorId);

// Rutas protegidas (solo admin)
router.post(
  '/',
  authMiddleware.verificarToken,
  authMiddleware.verificarRol(ROL_ADMIN),
  categoriaValidator.crearValidator,
  manejarErroresValidacion,
  categoriaController.crear
);

router.put(
  '/:id',
  authMiddleware.verificarToken,
  authMiddleware.verificarRol(ROL_ADMIN),
  categoriaValidator.actualizarValidator,
  manejarErroresValidacion,
  categoriaController.actualizar
);

router.delete(
  '/:id',
  authMiddleware.verificarToken,
  authMiddleware.verificarRol(ROL_ADMIN),
  categoriaController.eliminar
);

export default router;