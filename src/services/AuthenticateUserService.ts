import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '../models/Users';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
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

    const token = sign({}, '1c85468a7e8bf25ba59595cef153bda9', {
      subject: findUser.id,
      expiresIn: '1d',
    });

    const { password: del, ...user } = findUser;

    return { user, token };
  }
}
