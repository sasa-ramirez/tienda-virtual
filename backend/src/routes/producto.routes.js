import { Router } from 'express';
import productoController from '../controllers/producto.controller.js';
import productoValidator from '../validators/producto.validator.js';
import manejarErroresValidacion from '../middlewares/validacion.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

const ROL_ADMIN = 1;

// Rutas públicas
router.get('/', productoController.listarTodos);
router.get('/:id', productoController.obtenerPorId);

// Rutas protegidas (solo admin)
router.post(
  '/',
  authMiddleware.verificarToken,
  authMiddleware.verificarRol(ROL_ADMIN),
  productoValidator.crearValidator,
  manejarErroresValidacion,
  productoController.crear
);

router.put(
  '/:id',
  authMiddleware.verificarToken,
  authMiddleware.verificarRol(ROL_ADMIN),
  productoValidator.actualizarValidator,
  manejarErroresValidacion,
  productoController.actualizar
);

router.delete(
  '/:id',
  authMiddleware.verificarToken,
  authMiddleware.verificarRol(ROL_ADMIN),
  productoController.eliminar
);

router.patch(
  '/:id/inventario',
  authMiddleware.verificarToken,
  authMiddleware.verificarRol(ROL_ADMIN),
  productoValidator.ajustarInventarioValidator,
  manejarErroresValidacion,
  productoController.ajustarInventario
);

export default router;