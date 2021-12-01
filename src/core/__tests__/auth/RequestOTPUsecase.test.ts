/* eslint-disable no-undef */
import { AuthenticationService } from '../../auth/AuthenticationService';
import { RequestOTPUseCase } from '../../auth/RequestOTPUsecase';

const Mock = jest.fn<AuthenticationService, any>(() => ({
  requestOtpCode: jest.fn(),
  authenticateWithUsernamePassword: jest.fn(),
  authenticateWithOtp: jest.fn(),
  silentRefreshLogin: jest.fn(),
}));
const mockedAuthenticationService = new Mock();
const testedUsecase = new RequestOTPUseCase(mockedAuthenticationService);

test('SHOULD call AuthenticationService  WHEN executed', async () => {
  await testedUsecase.execute('phone');
  expect(mockedAuthenticationService.requestOtpCode).toHaveBeenCalled();
});
