import { FindProfileRepository } from '../../core/findProfile/FindProfileRepository';

export class RestProfilesRepository implements FindProfileRepository {
  private currentUserToken?: string;

  setCurrentUserToken(currentUserToken: string): void {
    this.currentUserToken = currentUserToken;
  }

  async getAllProfile(): Promise<any> {
    if (this.currentUserToken !== undefined) {
      const requestOptions = {
        method: 'GET',
        headers: { Accept: 'application/vnd.github.v3+json' },
      };

      const res = await fetch(`${process.env.REACT_APP_GITHUB_API_URL}users`, requestOptions);

      if (res.status === 200) {
        const jsonProfile = await res.json();
        console.log('PROFILLLEEESSSSSS:::', res);
        return Promise.resolve(jsonProfile);
      } else {
        return Promise.reject(new Error('Something bad happened'));
      }
    } else {
      return Promise.reject(new Error('User not authenticated'));
    }
  }

  async getProfile(username: string): Promise<any> {
    if (this.currentUserToken !== undefined) {
      const requestOptions = {
        method: 'GET',
        headers: { Accept: 'application/vnd.github.v3+json' },
      };

      const res = await fetch(`${process.env.REACT_APP_GITHUB_API_URL}users/${username}`, requestOptions);

      if (res.status === 200) {
        const jsonProfile = await res.json();
        return Promise.resolve(jsonProfile);
      } else {
        return Promise.reject(new Error('Something bad happened'));
      }
    } else {
      return Promise.reject(new Error('User not authenticated'));
    }
  }
}
