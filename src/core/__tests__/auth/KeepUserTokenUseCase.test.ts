/* eslint-disable no-undef */
import { KeepUserTokenUseCase } from '../../auth/SaveUserTokenUseCase';
import { UserTokenRepository } from '../../auth/UserTokenRepository';

const Mock = jest.fn<UserTokenRepository, any>(() => ({
  save: jest.fn(),
  hasValidToken: jest.fn(),
  removeToken: jest.fn(),
  get: jest.fn(),
}));
const mockedUserTokenRepository = new Mock();
const testedUsecase = new KeepUserTokenUseCase(mockedUserTokenRepository);

test('SHOULD call UserTokenRepository WHEN executed', async () => {
  await testedUsecase.execute('toto');
  expect(mockedUserTokenRepository.save).toHaveBeenCalledWith('toto');
});
