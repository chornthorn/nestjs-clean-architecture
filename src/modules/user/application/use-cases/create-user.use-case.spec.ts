import { CreateUserUseCase } from './create-user.use-case';
import { UserRepositoryMock } from '../../infrastructure/database/user.repository.mock';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserRepositoryMock;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a user successfully', async () => {
    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const password = '123456';
    const user = await createUserUseCase.execute({ name, email, password });

    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
  });

  it('should call userRepository.save with a new user', async () => {
    const saveSpy = jest.spyOn(userRepository, 'save');
    const name = 'Jane Doe';
    const email = 'jane.doe@example.com';
    const password = '123456';
    await createUserUseCase.execute({ name, email, password });

    expect(saveSpy).toHaveBeenCalled();
  });
});
