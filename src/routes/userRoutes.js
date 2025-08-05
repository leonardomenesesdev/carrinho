import express from 'express';
import { UserController } from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Registro e login
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Rota protegida para pegar usuário atual
router.get('/current', authMiddleware.verifyToken, UserController.getCurrent);

export default router;
