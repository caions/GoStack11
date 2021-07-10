import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import { User } from '../models/Users';
import { AppError } from '../errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<Omit<User, 'password'>> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const userObj = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: del, ...user } = await usersRepository.save(userObj);

    return user;
  }
}
