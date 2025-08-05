import express from 'express';
import produtosController from '../controller/produtosController.js';
const router = express.Router()

router.get('/produtos', produtosController.getProdutos)
router.post('/produtos', produtosController.postProdutos)
export default router;