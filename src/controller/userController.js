import { UserModel } from '../model/userModel.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const UserController = {
  register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios' });
    }

    if (UserModel.getByEmail(email)) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const newUser = UserModel.create({ name, email, password });

    res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
  },

  login(req, res) {
    console.log('Tentativa de login na rota /api/users/login'); // <--- ADICIONE ESTA LINHA
    const { email, password } = req.body;

    const user = UserModel.getByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }

    // Gera token com ID e email
    const token = authMiddleware.generateToken({ id: user.id, email: user.email });

    res.json({ message: 'Login bem-sucedido', token });
  },

  getCurrent(req, res) {
    console.log('chamando errado')
    const user = UserModel.getById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  }
};
