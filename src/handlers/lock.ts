import express from 'express';
import { createLock, getLockById, getStations, updateLock } from '../controllers';

/**
 * Prefixo da rota: "/lock"
 */

export const lock = express.Router();

// Rotas
lock.post('/create', createLock);
lock.get('/:idLock', getLockById);
lock.put('/:idLock', updateLock);
lock.get('/stations', getStations);
