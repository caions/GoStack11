import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { User } from '../models/Users';

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: IRequest): Promise<Omit<User, 'password'>> {
    const usersRepository = getRepository(User);

    const findUser = await usersRepository.findOne({
      where: { email },
    });

    if (!findUser) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, findUser.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const { password: del, ...user } = findUser;

    return user;
  }
}
