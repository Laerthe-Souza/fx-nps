import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface UserData {
  name: string;
  email: string;
}

class CreateUserService {
  public async execute({ name, email }: UserData): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError('Esse e-mail já existe');
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
