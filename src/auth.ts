import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export function generateToken(payload: object, secret: jwt.Secret, options: object): string  {
  return jwt.sign(payload, secret, options);
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

    // @ts-ignore
    req.user = user;

    next();
  });
}
