/* eslint-disable no-unused-vars */
import { UserTokenRepository } from './UserTokenRepository';

export class IsUserAuthenticatedUseCase {
  userTokenRepository: UserTokenRepository;

  constructor(userTokenRepository: UserTokenRepository) {
    this.userTokenRepository = userTokenRepository;
  }

  async execute(): Promise<boolean> {
    const hasToken = await this.userTokenRepository.hasValidToken();
    if (hasToken) {
      return Promise.resolve(hasToken);
    } else {
      return Promise.resolve(false);
    }
  }
}
