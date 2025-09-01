import { fetchProdutos } from "../config/fetchProdutos.js";

const produtosDaApi = await fetchProdutos();
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
export default{getCarrinho, postCarrinho, putCarrinho, deleteCarrinho}