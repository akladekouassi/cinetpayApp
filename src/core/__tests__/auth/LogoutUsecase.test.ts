import { LogoutUsecase } from '../../auth/LogoutUsecase';
import { UserRepository } from '../../user/UserRepository';
import { UserTokenRepository } from '../../auth/UserTokenRepository';

const MockUserTokenRepository = jest.fn<UserTokenRepository, any>(() => ({
  hasValidToken: jest.fn(),
  save: jest.fn(),
  removeToken: jest.fn(),
  get: jest.fn(),
}));
const mockedUserTokenRepository = new MockUserTokenRepository();
const MockUserRepository = jest.fn<UserRepository, any>(() => ({
  get: jest.fn(),
  save: jest.fn(),
  removeUser: jest.fn(() => {
    return Promise.resolve();
  }),
}));
const mockedUserRepository = new MockUserRepository();
const testedUsecase = new LogoutUsecase(mockedUserTokenRepository, mockedUserRepository);

test('SHOULD call UserTokenRepository and UserRepository WHEN executed', async () => {
  await testedUsecase.execute();
  expect(mockedUserTokenRepository.removeToken).toHaveBeenCalled();
  expect(mockedUserRepository.removeUser).toHaveBeenCalled();
});
