import { Router } from 'express';
import usuarioController from '../controllers/usuario.controller.js';

const router = Router();

router.post('/registro', usuarioController.registrar);

export default router;