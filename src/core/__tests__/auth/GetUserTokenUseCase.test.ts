import { GetUserTokenUseCase } from '../../auth/GetUserTokenUseCase';
import { UserTokenRepository } from '../../auth/UserTokenRepository';
import { IsUserAuthenticatedUseCase } from '../../auth/IsUserAuthenticatedUseCase';

const MockUserTokenRepository = jest.fn<UserTokenRepository, any>(() => ({
  hasValidToken: jest.fn(),
  save: jest.fn(),
  removeToken: jest.fn(),
  get: jest.fn(),
}));
const mockedUserTokenRepository = new MockUserTokenRepository();

const MockIsUserAuthenticatedUseCase = jest.fn<Partial<IsUserAuthenticatedUseCase>, any>(() => ({
  execute: jest.fn().mockReturnValue(true),
}));

const mockedIsUserAuthenticatedUseCase = new MockIsUserAuthenticatedUseCase();
const testedUsecase = new GetUserTokenUseCase(mockedUserTokenRepository, mockedIsUserAuthenticatedUseCase as IsUserAuthenticatedUseCase);
test('SHOULD call userTokenRepository WHEN executed', async () => {
  await testedUsecase.execute();
  expect(mockedUserTokenRepository.get).toHaveBeenCalled();
});
