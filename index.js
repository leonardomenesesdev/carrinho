import express from 'express';
<<<<<<< HEAD
// import produtosRoutes from './src/routes/produtosRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas de produtos
// app.use('/api', produtosRoutes);

// Rotas de usuários
app.use('/api/users', userRoutes);
=======
import produtosRoutes from './src/routes/produtosRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', produtosRoutes);
>>>>>>> main

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
<<<<<<< HEAD
});

export default { app, server };
=======
})
export default {app, server}
>>>>>>> main
