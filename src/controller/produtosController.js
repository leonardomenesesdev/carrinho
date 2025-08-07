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

//CARRINHO
let carrinho = [];

async function postCarrinho(req, res) {
    try {
        const { produtos } = req.body; // Array: [{ id, quantidade }]

        if (!Array.isArray(produtos)) {
            return res.status(400).json({ message: 'Formato inválido. Esperado: array de produtos.' });
        }

        const itensCarrinho = [];

        for (const item of produtos) {
            const produto = produtosDaApi.find(p => String(p.id) === String(item.id));

            if (!produto) {
                return res.status(404).json({ message: `Produto com ID ${item.id} não encontrado.` });
            }

            const itemCarrinho = {
                ...produto,
                quantidade: item.quantidade || 1
            };

            itensCarrinho.push(itemCarrinho);
        }
        carrinho.push(...itensCarrinho );
        
        res.status(201).json({ message: 'Produtos adicionados ao carrinho', carrinho });
    } catch (error) {
        console.error('Error adicionando ao carrinho:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
}

async function getCarrinho(req, res){
    try{
        res.status(200).json({ carrinho });
    } catch(error){
        console.error('Error fetching carrinho:', error)
        res.status(500).json({ message: 'Erro interno no servidor' })
    }
}

async function deleteCarrinho(req, res){
    try {
        let itemId = req.params.id;
        carrinho = carrinho.filter(item => String(item.id) !== itemId)
        res.status(200).json({ message: 'Produto removido do carrinho com sucesso', carrinho });
    } catch (error) {
        
    }
}


//util pra alterar quantidade
async function putCarrinho(req, res){
    try {
        let itemId = req.params.id;
        let novaQuantidade = req.body.quantidade;
        const item = carrinho.find(item => String(item.id) === itemId);
        if(!item){
            return res.status(404).json({ message: 'Item não encontrado no carrinho' });
        }
        item.quantidade = novaQuantidade;
        res.status(200).json({ message: 'Quantidade atualizada com sucesso', item });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export default {getProdutos, postProdutos, putProdutos, deleteProduto, postCarrinho, getCarrinho, putCarrinho, deleteCarrinho}