export interface AuthenticationService {
  authenticateWithUsernamePassword(username: string, password: string): Promise<string>;
}
