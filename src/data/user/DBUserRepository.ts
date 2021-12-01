import { UserRepository } from '../../core/user/UserRepository';
import { User } from '../../core/user/User';

export class DBUserRepository implements UserRepository {
  async get(): Promise<User | null> {
    const user = JSON.parse(localStorage.getItem('user')!);

    return Promise.resolve(user);
  }

  async save(user: User): Promise<void> {
    localStorage.setItem('user', JSON.stringify(user));
    return Promise.resolve();
  }

  async removeUser(): Promise<void> {
    localStorage.removeItem('user');
    return Promise.resolve();
  }
}
