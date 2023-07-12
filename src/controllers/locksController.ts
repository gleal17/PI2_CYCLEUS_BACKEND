import { Lock } from '../database/entities/Lock';
import { User } from '../database/entities/User';
import { dataSource } from "../config"

export class LockController {
  private userRepository = dataSource.getRepository(User);
  private lockRepository = dataSource.getRepository(Lock);


  async getStations(req, res) {
    try {

      const stations = await dataSource.createQueryBuilder()
        .select('DISTINCT lock.station', 'station')
        .from(Lock, "lock")
        .getRawMany();

      res.status(200).json(stations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve locks' });
    }
  }

  async getLockById(req, res) {
    try {
      const { id } = req.params;
      const lock = await this.lockRepository.findOneBy({
        idLock: id,
      })

      if (!lock) {
        return res.status(404).json({ error: 'Lock not found' });
      }

      res.status(200).json(lock);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve lock' });
    }
  }

  async createLock(req, res) {
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

  async updateLock(req, res) {
    try {
      const { qrcode, user } = req.params;

      const lock = await this.lockRepository.find({ where: { QRCode: qrcode } });

      if (!lock) {
        return res.status(404).json({ error: 'Lock not found' });
      }

      const usuario = await this.userRepository.findOne(user);

      if (lock[0].locked) {
        if (usuario == lock[0].user) {
          lock[0].locked = false;
          await this.lockRepository.save(lock[0]);
          res.status(200).json(lock);
        }
      }
      else if (usuario) {
        const esperoNull = await this.lockRepository.findOneBy({
          user: usuario,
        });
        if (!esperoNull) {
          lock[0].locked = true;
          if (!usuario) throw new Error();
          lock[0].user = usuario;
          await this.lockRepository.save(lock[0]);
          res.status(200).json(lock);
        }
        else throw new Error();
      }
      res.status(500).json({error: 'Failed to update lock'});

    } catch (error) {
      res.status(500).json({ error: 'Failed to update lock' });
    }
  }

  async deleteLock(req, res) {
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