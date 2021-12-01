import { UserRepository } from './UserRepository';
import { User } from './User';

export class SaveCurrentUserUseCase {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<void> {
    return this.userRepository.save(user);
  }
}
