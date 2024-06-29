import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserUseCase } from './update-user.use-case';
import { UserRepositoryMock } from '../../infrastructure/database/user.repository.mock';
import { User } from '../../domain/user.entity';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepository: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: 'IUserRepository',
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    userRepository = module.get<UserRepositoryMock>('IUserRepository');
  });

  it('should update a user', async () => {
    const user = await userRepository.save(
      new User('John Doe', 'john@example.com'),
    );
    const updatedUser = await updateUserUseCase.execute({
      id: user.id,
      name: 'John Smith',
      email: 'johnsmith@example.com',
      password: 'password',
    });
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('John Smith');
  });
});
