import express from 'express';
import produtosRoutes from './src/routes/produtosRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import cors from 'cors';
import carrinhoRoutes from './src/routes/carrinhoRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

// Rotas de usuários
app.use('/api/users', userRoutes);
// Rotas de produtos
app.use('/api', produtosRoutes);
// Rotas de carrinho
app.use('/api', carrinhoRoutes);


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})
export default {app, server}
