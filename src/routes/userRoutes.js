import express from 'express';
import { UserController } from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Registro e login
//POST http://localhost:3000/api/users/register
router.post('/register', UserController.register);
//POST http://localhost:3000/api/users/login
router.post('/login', UserController.login);

// Rota protegida para pegar usuário atual a partir do token do usuario
//GET http://localhost:3000/api/users/current 
router.get('/current', authMiddleware.verifyToken, UserController.getCurrent);

export default router;
