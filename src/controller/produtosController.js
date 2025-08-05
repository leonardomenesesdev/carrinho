import { fetchProdutos } from "../config/fetchProdutos.js";

const produtosDaApi = await fetchProdutos();

async function getProdutos(req, res){
    try{
        res.status(200).json({produtosDaApi})
    } catch(error){
        console.error('Error fetching produtos:', error)
        res.status(500).json({ message: 'Erro interno no servidor' })
    }
}

async function postProdutos(req, res){
    try {
        const novoProduto = req.body;
        produtosDaApi.push(novoProduto);
        res.status(201).json({ message: 'Produto criado com sucesso', produto: novoProduto });
    } catch (error) {
        console.error('Error creating produto:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
}
export default {getProdutos, postProdutos}