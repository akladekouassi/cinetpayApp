import { FindProfileRepository } from './FindProfileRepository';

export class GetAllProfilesUseCase {
  findProfileRepository: FindProfileRepository;

  constructor(findProfileRepository: FindProfileRepository) {
    this.findProfileRepository = findProfileRepository;
  }

  async execute(): Promise<any> {
    return this.findProfileRepository.getAllProfile();
  }
}
