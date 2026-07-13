import { Router } from 'express';
import favoritoController from '../controllers/favorito.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware.verificarToken);

router.get('/', favoritoController.listarPropios);
router.post('/', favoritoController.agregar);
router.delete('/:productoId', favoritoController.eliminar);

export default router;