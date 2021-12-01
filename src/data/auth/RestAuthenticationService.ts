/* eslint-disable no-unused-vars */

import { AuthenticationService } from '../../core/auth/AuthenticationService';

export class RestAuthenticationService implements AuthenticationService {
  async authenticateWithUsernamePassword(email: string, password: string): Promise<string> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    };

    const res = await fetch(`${process.env.REACT_APP_FAKE_LOGIN_API_URL}login`, requestOptions);
    if (res.status === 200) {
      const json = await res.json();
      return Promise.resolve(json.token);
    } else {
      return Promise.reject(new Error('Bad auth'));
    }
  }
}
