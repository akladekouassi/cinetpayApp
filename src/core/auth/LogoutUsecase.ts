import { UserTokenRepository } from './UserTokenRepository';
import { UserRepository } from '../user/UserRepository';

export class LogoutUsecase {
  userTokenRepository: UserTokenRepository;
  userRepository: UserRepository;
  constructor(userTokenRepository: UserTokenRepository, userRepository: UserRepository) {
    this.userTokenRepository = userTokenRepository;
    this.userRepository = userRepository;
  }

  async execute(): Promise<void> {
    await this.userRepository.removeUser();
    await this.userTokenRepository.removeToken();

    return Promise.resolve();
  }
}
