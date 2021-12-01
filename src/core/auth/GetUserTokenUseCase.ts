import { IsUserAuthenticatedUseCase } from './IsUserAuthenticatedUseCase';
import { UserTokenRepository } from './UserTokenRepository';

export class GetUserTokenUseCase {
  userTokenRepository: UserTokenRepository;
  isUserAuthenticatedUseCase: IsUserAuthenticatedUseCase;

  constructor(userTokenRepository: UserTokenRepository, isUserAuthenticatedUseCase: IsUserAuthenticatedUseCase) {
    this.userTokenRepository = userTokenRepository;
    this.isUserAuthenticatedUseCase = isUserAuthenticatedUseCase;
  }

  async execute(): Promise<string> {
    const isAuthenticated = await this.isUserAuthenticatedUseCase.execute();
    if (isAuthenticated) {
      return this.userTokenRepository.get();
    } else {
      return Promise.reject(new Error('User not authenticated'));
    }
  }
}
