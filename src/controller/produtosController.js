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

async function putProdutos(req, res) {
    try {
        const { id } = req.params;
        const novosDados = req.body;

        const index = produtosDaApi.findIndex(produto => String(produto.id) === id);

        if (index === -1) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        produtosDaApi[index] = { ...produtosDaApi[index], ...novosDados };

        res.status(200).json({ message: 'Produto atualizado com sucesso', produto: produtosDaApi[index] });
    } catch (error) {
        console.error('Error updating produto:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
}

async function deleteProduto(req, res) {
    try {
        const { id } = req.params;

        const index = produtosDaApi.findIndex(produto => String(produto.id) === id);

        if (index === -1) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const produtoRemovido = produtosDaApi.splice(index, 1);

        res.status(200).json({ message: 'Produto removido com sucesso', produto: produtoRemovido[0] });
    } catch (error) {
        console.error('Error deleting produto:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
}



export default {getProdutos, postProdutos, putProdutos, deleteProduto}