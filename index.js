import express from 'express';
import produtosRoutes from './src/routes/produtosRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', produtosRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})
export default {app, server}