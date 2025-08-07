import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = {
  verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
      // Decodifica o token do usuario e coloca as informações no req.user
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded; 
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
  },

  generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }); // expira em 1 hora
  }
};
