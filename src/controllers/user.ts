import type { Request, Response } from 'express';
import { UserRequest } from '../models/user';
import { User } from '../database/entities/User';
import { generateToken } from '../auth';
import bcrypt from 'bcrypt';

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
export const updateUser = () => {};

// Deleta usuário
export const deleteUser = () => {};

export const login = () => {
  // Cria JWT
  // Atribui o jwt ao usuário
  // generateToken()
};

// Deslogar usuário do app
export const logout = () => {
  // JWT é valido?
  // Pega o usuário atual
  // Invalida o jwt
  // Atualiza o DB
};
