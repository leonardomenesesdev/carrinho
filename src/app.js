import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());

// Rotas de usuário
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
