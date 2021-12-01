import { AuthenticationService } from './AuthenticationService';

export class AuthenticateUserWithUsernamePasswordUseCase {
  authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  async execute(username: string, password: string): Promise<string> {
    return this.authenticationService.authenticateWithUsernamePassword(username, password);
  }
}
