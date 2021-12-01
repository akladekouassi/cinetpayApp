/* eslint-disable no-undef */
import { AuthenticationService } from '../../auth/AuthenticationService';
import { AuthenticateUserWithUsernamePasswordUseCase } from '../../auth/AuthenticateUserWithUsernamePasswordUseCase';

const Mock = jest.fn<AuthenticationService, any>(() => ({
  authenticateWithUsernamePassword: jest.fn(),
  requestOtpCode: jest.fn(),
  authenticateWithOtp: jest.fn(),
  silentRefreshLogin: jest.fn(),
}));
const mockedAuthenticationService = new Mock();
const testedUsecase = new AuthenticateUserWithUsernamePasswordUseCase(mockedAuthenticationService);

test('SHOULD call AuthenticationService  WHEN executed', async () => {
  await testedUsecase.execute('login', 'password');
  expect(mockedAuthenticationService.authenticateWithUsernamePassword).toHaveBeenCalledWith('login', 'password');
});
