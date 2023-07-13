import type { Request, Response } from 'express';
import { Lock } from '../database/entities/Lock';

// Cria novo lock
export const createLock = async (req: Request, res: Response) => {
  const newLock = req.body;

  // Para criar use isso !
  await Lock.insert(newLock);
};

// Pega lock pelo ID
export const getLockById = async (req: Request, res: Response) => {
  // Pega o ID do lock
  const { idLock } = req.params;

  // Recebe um usuário ou undefined
  const lock = await Lock.findOneBy({ idLock: parseInt(idLock) });

  // Verifica se o lock existe
  // Retorna o lock
};

// Atualiza o estado do lock
export const updateLock = async (req: Request, res: Response) => {
  // Pega o ID do lock
  const { idLock } = req.params;

  // Recebe um usuário ou undefined
  const lock = await Lock.findOneBy({ idLock: parseInt(idLock) });
  // Verifica se o lock existe
  // Retorna o lock
};

// Pega estações
export const getStations = async (req: Request, res: Response) => {};
