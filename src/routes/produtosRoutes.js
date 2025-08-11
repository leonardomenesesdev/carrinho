import express from 'express';
import produtosController from '../controller/produtosController.js';
const router = express.Router()
import { authMiddleware } from '../middleware/authMiddleware.js';

router.use(authMiddleware.verifyToken);

router.get('/produtos', produtosController.getProdutos)
router.post('/produtos', produtosController.postProdutos)
router.put('/produtos/:id', produtosController.putProdutos);
router.delete('/produtos/:id', produtosController.deleteProduto);

router.post('/carrinho', produtosController.postCarrinho)
router.get('/carrinho', produtosController.getCarrinho);
router.put('/carrinho/:id', produtosController.putCarrinho);
router.delete('/carrinho/:id', produtosController.deleteCarrinho);

export default router;