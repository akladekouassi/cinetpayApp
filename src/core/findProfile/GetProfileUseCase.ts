import { FindProfileRepository } from './FindProfileRepository';

export class GetProfileUseCase {
  findProfileRepository: FindProfileRepository;

  constructor(findProfileRepository: FindProfileRepository) {
    this.findProfileRepository = findProfileRepository;
  }
  async execute(username: string): Promise<any> {
    return this.findProfileRepository.getProfile(username);
  }
}
