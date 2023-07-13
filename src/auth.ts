import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export function generateToken(userId: string) {
  const payload = { userId };
  const secretKey = ''; //secret
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secretKey, options);
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, 'sua_chave_secreta', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token de autenticação inválido' });
    }

    // Isso aqui tá certo mesmo??
    // @ts-ignore
    req.user = user;

    next();
  });
}
