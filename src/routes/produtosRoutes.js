import express from 'express';
import produtosController from '../controller/produtosController.js';
const router = express.Router()

router.get('/produtos', produtosController.getProdutos)
router.post('/produtos', produtosController.postProdutos)
router.put('/produtos/:id', produtosController.putProdutos);
router.delete('/produtos/:id', produtosController.deleteProduto);

export default router;