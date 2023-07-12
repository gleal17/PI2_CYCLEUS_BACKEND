import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Lock } from '../entities/Lock';
import { User } from '../entities/User';

export class LockController {
  private lockRepository = getRepository(Lock);

  async getStations(req: Request, res: Response) {
    try {

      const query = this.lockRepository.createQueryBuilder('lock')
        .select('DISTINCT lock.station', 'station')
        .getRawMany();

      const uniqueValues = await query;

      res.status(200).json(uniqueValues);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve locks' });
    }
  }

  async getLockById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const lock = await this.lockRepository.findOne(id);

      if (!lock) {
        return res.status(404).json({ error: 'Lock not found' });
      }

      res.status(200).json(lock);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve lock' });
    }
  }

  async createLock(req: Request, res: Response) {
    try {
      const { qrcode, station } = req.body;

      const lock = new Lock();
      lock.QRCode = qrcode;
      lock.station = station;

      await this.lockRepository.save(lock);

      res.status(201).json(lock);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create lock' });
    }
  }

  async updateLock(req: Request, res: Response) {
    try {
      const { qrcode, user } = req.params;

      const lock = await this.lockRepository.find({where: {QRCode: qrcode}});

      if (!lock) {
        return res.status(404).json({ error: 'Lock not found' });
      }

      if(lock[0].locked){
        lock[0].locked = false;
        lock[0].user = null;
      }
      else{
        lock[0].locked = true;
        const userRepository = getRepository(User);
        const usuario = await userRepository.findOne(user);
        if(usuario) throw new Error();
        lock[0].user = usuario;
      }

      await this.lockRepository.save(lock[0]);

      res.status(200).json(lock);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update lock' });
    }
  }

  async deleteLock(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const lock = await this.lockRepository.findOne(id);

      if (!lock) {
        return res.status(404).json({ error: 'Lock not found' });
      }

      await this.lockRepository.remove(lock);

      res.status(200).json({ message: 'Lock deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete lock' });
    }
  }
}