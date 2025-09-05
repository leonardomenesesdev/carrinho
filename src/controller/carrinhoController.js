import { fetchProdutos } from "../config/fetchProdutos.js";
import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();



async function postCarrinho(req, res) {
    try {
        const { produtos } = req.body; // Array: [{ id, quantidade }]

        if (!Array.isArray(produtos)) {
            return res.status(400).json({ message: 'Formato inválido. Esperado: array de produtos.' });
        }

        const data = produtos.map(p => ({
            userId: req.userId,
            productId: p.id,
            quantity: p.quantidade
        }))
        const newCarrinho = await prisma.cart.createMany({
            data
        })
        
        res.status(201).json({ message: 'Produtos adicionados ao carrinho', newCarrinho });
    } catch (error) {
        console.error('Error adicionando ao carrinho:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
}


async function getCarrinho(req, res){
    try{
        const carrinhoByUser = await prisma.cart.findMany({
            where:{
                userId: req.userId
            },
            include:{
                product: true
            }
        })
        if (!carrinhoByUser || carrinhoByUser.length === 0) {
            return res.status(200).json([]);
        }
        const carrinhoFormatado = carrinhoByUser.map(item => ({
            nome: item.product.name,
            preco: item.product.price,
            quantidade: item.quantity
        }))
        res.status(200).json({ carrinhoFormatado });
        console.log(carrinhoFormatado)
    } catch(error){
        console.error('Error fetching carrinho:', error)
        res.status(500).json({ message: 'Erro interno no servidor' })
    }
}

async function deleteCarrinho(req, res) {
  try {
    const carrinhoId = req.params.id;

    const produtoCarrinho = await prisma.cart.delete({
      where: { id: carrinhoId }
    });

    res.status(200).json({
      message: 'Produto removido do carrinho com sucesso',
      produtoCarrinho
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no deleteCarrinho' });
  }
}


async function putCarrinho(req, res){
    try {
        let novaQuantidade = req.body.quantity;
        const carrinhoId = req.params.id
        const produtoCarrinho = await prisma.cart.update({
            where: {id: carrinhoId},
            data:{
                quantity: novaQuantidade
            }
        })
        return res.status(200).json({message: "Produto atualizado com sucesso", produtoCarrinho})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export default{getCarrinho, postCarrinho, putCarrinho, deleteCarrinho}