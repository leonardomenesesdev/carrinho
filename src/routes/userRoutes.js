// src/routes/userRoutes.js
import express from 'express';
import userController from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware.verifyToken, userController.getCurrentUser); 

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);



export default router;
