import { User } from '../database/entities/User';
import { dataSource } from '../config';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const generateToken = (id: any) => {
  return jwt.sign({ id }, 'CHAVE MUITO SECRETA~', {
    expiresIn: '3d'
  });
};

export class UserController {
  private userRepository = dataSource.getRepository(User);

  async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await dataSource.manager.find(User);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  }

  async getUserByMatricula(req: Request, res: Response) {
    try {
      const { matricula } = req.params;
      const user = await this.userRepository.findOne({ where: { matricula } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { matricula, fullName, email, password } = req.body;

      const user = new User();
      user.matricula = matricula;
      user.fullName = fullName;
      user.email = email;
      user.password = password;

      await this.userRepository.save(user);

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { matricula } = req.params;
      const { fullName, email, password } = req.body;

      const user = await this.userRepository.findOne({ where: { matricula } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.email = email || user.email;
      user.fullName = fullName || user.fullName;
      user.password = password || user.password;

      await this.userRepository.save(user);

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { matricula } = req.params;

      const user = await this.userRepository.findOne({ where: { matricula } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await this.userRepository.remove(user);

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { matricula, password } = req.body;
      const user = await this.userRepository.findOneBy(matricula);
      if (!user) {
        return res.status(401).json({
          error: 'Usuário inexistente',
          message: 'Usuário inexistente'
        });
      }
      if (user.password === password) {
        let expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + 3);
        return res.status(200).json({
          matricula: user.matricula,
          fullName: user.fullName,
          email: user.email,
          token: generateToken(user.matricula),
          expiresIn
        });
      } else {
        return res.status(401).json({
          error: 'Impossível autenticar',
          message: 'Senha ou usuário incorretos'
        });
      }
    } catch (error) {
      return res.status(500).json({ error, message: 'erro inesperado' });
    }
  }
}
