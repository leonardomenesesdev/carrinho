import express from 'express';
import carrinhoController from '../controller/carrinhoController.js';
const router = express.Router()
import { authMiddleware } from '../middleware/authMiddleware.js';

router.post('/carrinho', carrinhoController.postCarrinho)
router.get('/carrinho', carrinhoController.getCarrinho);
router.put('/carrinho/:id', carrinhoController.putCarrinho);
router.delete('/carrinho/:id', carrinhoController.deleteCarrinho);

export default router