import { PrismaClient } from "../generated/prisma/client.js";
import { authMiddleware } from '../middleware/authMiddleware.js';

const prisma = new PrismaClient();

async function createUser(req, res){
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios' });
    }

    // Verifica se email já existe
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    // Cria usuário (em produção, faça hash da senha!)
    const user = await prisma.user.create({
      data: { name, email, password },
      select: { id: true, name: true, email: true, createdAt: true } // não retorna a senha
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error('createUser error:', err);
    return res.status(500).json({ error: 'Erro ao criar usuário', details: err.message });
  }
}

async function loginUser(req, res){
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera token com sua função do middleware
    const token = authMiddleware.generateToken({ id: user.id});

    return res.json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    console.error('loginUser error:', err);
    return res.status(500).json({ error: 'Erro ao realizar login', details: err.message });
  }
}

async function getUsers(req, res){
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true }
    });
    return res.json(users);
  } catch (err) {
    console.error('getUsers error:', err);
    return res.status(500).json({ error: 'Erro ao buscar usuários', details: err.message });
  }
}

async function getUserById(req, res){
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    return res.json(user);
  } catch (err) {
    console.error('getUserById error:', err);
    return res.status(500).json({ error: 'Erro ao buscar usuário', details: err.message });
  }
}

async function updateUser(req, res){
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (email) {
      const other = await prisma.user.findUnique({ where: { email } });
      if (other && other.id !== id) {
        return res.status(400).json({ error: 'E-mail já está em uso por outro usuário' });
      }
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { ...(name !== undefined && { name }), ...(email !== undefined && { email }), ...(password !== undefined && { password }) },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    return res.json(updated);
  } catch (err) {
    console.error('updateUser error:', err);
    // Se o id não existir, prisma lança um erro — tratamos como 404
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    return res.status(500).json({ error: 'Erro ao atualizar usuário', details: err.message });
  }
}

async function deleteUser(req, res){
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    return res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error('deleteUser error:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    return res.status(500).json({ error: 'Erro ao deletar usuário', details: err.message });
  }
}

async function getCurrentUser(req, res){
  try {
    // authMiddleware.verifyToken deve ter preenchido req.userId
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json(user);
  } catch (err) {
    console.error('getCurrentUser error:', err);
    return res.status(500).json({ error: 'Erro ao obter usuário atual', details: err.message });
  }
}

export default {createUser, loginUser, getUsers, getUserById, updateUser,deleteUser,getCurrentUser}
