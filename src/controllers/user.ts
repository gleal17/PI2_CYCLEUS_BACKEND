import type { Request, Response } from 'express';
import { UserRequest } from '../models/user';
import { User } from '../database/entities/User';
import { authenticateToken, generateToken } from '../auth';
import bcrypt from 'bcrypt';
import { user } from '../handlers';

// Criar novo usuário
export const createUser = async (req: Request, res: Response) => {
  // Pegar valores do request
  const { matricula, fullName, email, password } = req.body as UserRequest;

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, '123');

  try {
    // Criar usuário no DB
    await User.insert({ matricula, fullName, email, password: hashedPassword });

    // Criar JWT e salva o jwt do usuário para mantê-lo logado
    // generateToken()

    return res
      .status(201)
      .json({ response: 'Data inserted', data: { matricula, fullName, email, password } });
  } catch (error) {
    return res.status(500).json({ response: 'An error ocurred', error });
  }
};

// Pegar um usuário pela matricula
export const getUserByMatricula = async (req: Request, res: Response) => {
  // Desconstroi parâmetro
  const { matricula } = req.params;

  // Recebe um usuário ou undefined
  const user = await User.findOne({ where: { matricula } });

  // Verifica se usuário existe
  if (!user) {
    return res.status(404).json({ response: 'User not found' });
  }

  // Retorna valor do usuário
  return res.status(200).json({ response: 'User found', data: { user } });
};

// Atualiza dado do usuário
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { matricula } = req.params;
    const { fullName, email, password } = req.body as UserRequest;

    // Atualiza os dados do usuário no banco de dados
    await User.update({ fullName, email, password }, { where: { matricula } });

    return res.status(200).json({ response: 'User updated' });
  } catch (error) {
    return res.status(500).json({ response: 'An error occurred', error });
  }
};

// Deleta usuário
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { matricula } = req.params;

    // Deleta o usuário no banco de dados
    //await User.delete({ where: { matricula: Number(matricula) } });

    return res.status(200).json({ response: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ response: 'An error occurred', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as UserRequest;

    // Verifica se o usuário existe no banco de dados
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ response: 'User not found' });
    }

    // Verifica se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ response: 'Invalid password' });
    }

    // Gera um token JWT para autenticação
    const token = ''; //generateToken() 

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ response: 'An error occurred', error });
  }
};

// Efetua logout do usuário
export const logout = async (req: Request, res: Response) => {
  try {
    const user = req.user as unknown as User; // Obtém o usuário autenticado a partir do middleware

    // Invalida o token do usuário no banco de dados ou em qualquer outra lógica necessária

    return res.status(200).json({ response: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ response: 'An error occurred', error });
  }
};
