import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import { User } from '../models/Users';

interface IResponse {
  user: Omit<User, 'password'>;
}

interface IRequest {
  avatarFilename: string;
  user_id: string;
}

export class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFilename,
  }: IRequest): Promise<IResponse> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await userRepository.save(user);
    const { password, ...userRest } = user;

    return { user: userRest };
  }
}
