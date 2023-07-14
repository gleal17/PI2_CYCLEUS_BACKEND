import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}
interface Payload {
  userId: string;
  name: string;
}
const secret = process.env.JWT_SECRET || '';

export function UserAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const payload = verify(token, secret) as Payload;
    req.user = payload; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
