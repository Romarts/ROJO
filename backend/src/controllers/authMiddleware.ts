import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "ROJO_SECRET_KEY";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => 
    {  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ mensagem: "Token não fornecido." });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Aqui o req.user agora terá o ID, NOME e ROLE
    next();
  } catch (err) {
    return res.status(401).json({ mensagem: "Token inválido ou expirado." });
  }
};

// Nova função para proteger rotas de Admin
export const adminOnly = (req: any, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res.status(403).json({ mensagem: "Acesso negado: Apenas administradores." });
  }
};