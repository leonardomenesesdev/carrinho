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
    // req.user foi preenchido pelo middleware verifyToken
    const user = UserModel.getById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  }
};
