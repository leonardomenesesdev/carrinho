import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/productModel.js";

async function getProdutos(req, res) {
  try {
    const produtos = await getAllProducts();
    res.status(200).json({ produtos });
  } catch (error) {
    console.error("Error fetching produtos:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
}

async function postProdutos(req, res) {
  try {
    const { name, price } = req.body;

    const novoProduto = await createProduct({
      name,
      price: parseFloat(price),
    });

    res
      .status(201)
      .json({ message: "Produto criado com sucesso", produto: novoProduto });
  } catch (error) {
    console.error("Error creating produto:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
}

async function putProdutos(req, res) {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const produtoAtualizado = await updateProduct(id, {
      ...(name && { name }),
      ...(price && { price: parseFloat(price) }),
    });

    res.status(200).json({
      message: "Produto atualizado com sucesso",
      produto: produtoAtualizado,
    });
  } catch (error) {
    console.error("Error updating produto:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(500).json({ message: "Erro interno no servidor" });
  }
}

async function deleteProduto(req, res) {
  try {
    const { id } = req.params;

    const produtoRemovido = await deleteProduct(id);

    res.status(200).json({
      message: "Produto removido com sucesso",
      produto: produtoRemovido,
    });
  } catch (error) {
    console.error("Error deleting produto:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(500).json({ message: "Erro interno no servidor" });
  }
}

export default { getProdutos, postProdutos, putProdutos, deleteProduto };
