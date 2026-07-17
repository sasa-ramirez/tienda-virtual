import { Router } from 'express';
import carritoController from '../controllers/carrito.controller.js';
import carritoValidator from '../validators/carrito.validator.js';
import manejarErroresValidacion from '../middlewares/validacion.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware.verificarToken);

router.get('/', carritoController.obtener);

router.post(
  '/',
  carritoValidator.agregarValidator,
  manejarErroresValidacion,
  carritoController.agregar
);

router.put(
  '/:detalleId',
  carritoValidator.actualizarValidator,
  manejarErroresValidacion,
  carritoController.actualizar
);

router.delete('/:detalleId', carritoController.eliminar);
router.delete('/', carritoController.vaciar);

export default router;