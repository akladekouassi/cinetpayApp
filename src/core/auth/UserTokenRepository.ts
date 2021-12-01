export interface UserTokenRepository {
  hasValidToken(): Promise<boolean>;
  save(userToken: string): Promise<void>;
  removeToken(): Promise<void>;
  get(): Promise<string>;
}

export class DBTokenRepository implements UserTokenRepository {
  async hasValidToken(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (Boolean(token)) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }

  async get(): Promise<string> {
    const token = localStorage.getItem('token')!;

    return Promise.resolve(token);
  }

  async save(userToken: string): Promise<void> {
    localStorage.setItem('token', userToken);
    return Promise.resolve();
  }

  async removeToken(): Promise<void> {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
}
