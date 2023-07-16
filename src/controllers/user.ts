import type { Request, Response } from 'express';
import { UserRequest } from '../models/user';
import { User } from '../database/entities/User';
import { generateToken } from '../auth';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


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
    const token = generateToken(matricula);

    return res
      .status(201)
      .json({ response: 'Data inserted', data: { matricula, fullName, email, password, token } });
  } catch (error) {
    return res.status(500).json({ response: 'An error ocurred', error });
  }
};

export const login = async (req: Request, res: Response) => {
  // Cria JWT
  const { matricula, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, '123');

  const user = await User.findOne({ where: { matricula } });
  if (user)
    if (hashedPassword === user.password) {
      // Atribui o jwt ao usuário
      // generateToken()
      const token = generateToken(matricula);
      return res.status(200).json({
        matricula: user.matricula,
        fullName: user.fullName,
        email: user.email,
        token
      });
    }
    else {
      return res.status(400);
    }
  else
    return res.status(400);
};

// Deslogar usuário do app
export const logout = async (req: Request, res: Response) => {
  // JWT é valido?
  // Pega o usuário atual
  // Invalida o jwt
  // Atualiza o DB
  res.status(200).json({ token: null });
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
    const matricula = req.params.matricula;
    const user = await User.findOne({ where: { matricula } });
    if (user) {
      user.email = req.params.email || user.email;
      user.password = req.params.password ? await bcrypt.hash(req.params.password, '123') : user.password;
      user.fullName = req.params.fullName || user.fullName;
      User.save(user);
    }
  } catch (error) {
    return res.status(500).json({
      error
    });
  }

};

// Deleta usuário
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const matricula = req.params.matricula;
    const user = await User.findOne({ where: { matricula } });
    if (user) {
      await User.remove(user);
      res.status(200).json({message: "Usuário removido"}); 
    }
    else res.status(400);
  }catch (error) {
    return res.status(500).json({
      error,
      message: "Erro ao apagar usuário",
    });
  }
}


