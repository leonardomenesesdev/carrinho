import jwt from 'jsonwebtoken';

// Chave secreta para assinar tokens (em produção use variável de ambiente)
const SECRET_KEY = 'Avanti';

export const authMiddleware = {
  // Middleware para verificar o token JWT
  verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    // O token vem no formato "Bearer token_aqui"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
      // Decodifica o token e coloca as informações no req.user
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded; 
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
  },

  // Função auxiliar para criar tokens (vamos usar no controller)
  generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // expira em 1 hora
  }
};
