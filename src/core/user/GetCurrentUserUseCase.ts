import { UserRepository } from './UserRepository';
import { User } from './User';

export class GetCurrentUserUseCase {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<User | null> {
    return JSON.parse(localStorage.getItem('user')!);
  }
}
