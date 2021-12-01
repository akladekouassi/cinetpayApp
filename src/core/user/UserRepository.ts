import { User } from './User';

export interface UserRepository {
  get(): Promise<User | null>;
  save(user: User): Promise<void>;
  removeUser(): Promise<void>;
}
