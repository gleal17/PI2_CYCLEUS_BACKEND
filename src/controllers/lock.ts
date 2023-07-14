import type { Request, Response } from 'express';
import { Lock } from '../database/entities/Lock';
import { User } from '../database/entities/User';
import { dataSource } from '../config';

// Cria novo lock
export const createLock = async (req: Request, res: Response) => {
  try {
    const { qrcode, station } = req.body;

    // Para criar use isso !
    const lock = await Lock.insert({ QRCode: qrcode, station: station });
    res.status(201).json(lock);
  }
  catch (error) {
    res.status(500);
  }
};

// Pega lock pelo ID
export const getLockById = async (req: Request, res: Response) => {
  // Pega o ID do lock
  const { idLock } = req.params;

  // Recebe um usuário ou undefined
  const lock = await Lock.findOneBy({ idLock: parseInt(idLock) });

  // Verifica se o lock existe
  if (!lock) res.status(204);
  // Retorna o lock
  res.status(200).json(lock);
};

// Atualiza o estado do lock
export const updateLock = async (req: Request, res: Response) => {
  // Pega o ID do lock
  const { idLock } = req.params;

  // Recebe um usuário ou undefined
  const lock = await Lock.findOneBy({ idLock: parseInt(idLock) });
  // Verifica se o lock existe
  if (!lock) res.status(204);
  // Retorna o lock
};

export const openLock = async (req: Request, res: Response) => {
  // Pega o ID do lock
  const { qrcode, matricula } = req.params;

  // Recebe um usuário ou undefined
  const lock = await Lock.findOneBy({ QRCode: qrcode });
  const user = await User.findOneBy({ matricula: matricula });
  // Verifica se o lock existe
  if (!lock) res.status(204);
  else {
    if (lock.user != user) res.status(403);
    fetch('http://192.168.38.23/fechar_trava');
    lock.locked = false;
    await Lock.save(lock);
    res.status(200);
  }
  res.status(500);
};

export const closeLock = async (req: Request, res: Response) => {
  // Pega o ID do lock
  const { qrcode, matricula } = req.params;

  const lock = await Lock.findOneBy({ QRCode: qrcode });
  // Verifica se o lock existe
  if (!lock) res.status(204);
  else {
    const user = await User.findOneBy({ matricula: matricula });
    if (!user) res.status(400);
    else {
      if (lock.locked) res.status(403);
      fetch('http://192.168.38.23/abrir_trava');
      lock.locked = true;
      lock.user = user;
      await Lock.save(lock);
      res.status(200);
    }
  }
  res.status(500);
};

// Pega estações
export const getStations = async (req: Request, res: Response) => {
  const stations = dataSource.getRepository(Lock).createQueryBuilder("lock").distinctOn(["lock.station"]).orderBy("lock.station");
  if (stations)
    res.status(200).json(stations)
  else
    res.status(204);
};

export const getByStation = async (req: Request, res: Response) => {
  const { station } = req.params
  const lock = await Lock.findOneBy({ station: station });
  if (lock)
    res.status(200).json(lock)
  else
    res.status(204);
};