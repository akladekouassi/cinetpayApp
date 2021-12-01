import { UserTokenRepository } from './UserTokenRepository';

export class KeepUserTokenUseCase {
  userTokenRepository: UserTokenRepository;

  constructor(userTokenRepository: UserTokenRepository) {
    this.userTokenRepository = userTokenRepository;
  }

  async execute(userToken: string): Promise<void> {
    return this.userTokenRepository.save(userToken);
  }
}
