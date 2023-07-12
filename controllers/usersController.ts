import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export class UserController {
  private userRepository = getRepository(User);

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userRepository.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userRepository.findOne(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = new User();
      user.name = name;
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
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await this.userRepository.findOne(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.name = name || user.name;
      user.email = email || user.email;

      await this.userRepository.save(user);

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await this.userRepository.findOne(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await this.userRepository.remove(user);

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}