import express from 'express';
import { createUser, getUserByMatricula } from '../controllers';
import { authenticateToken } from '../auth';

/**
 * Prefixo da rota: "/user"
 */

export const user = express.Router();

user.post('/create', createUser);
user.get('/:matricula', authenticateToken, getUserByMatricula);

// TODO:router.post('/logout', authenticateMiddleware, usersController.logout);
