import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryMock } from '../../infrastructure/database/user.repository.mock';
import { User } from '../../domain/user.entity';
import { GetAllUsersUseCase } from './get-all-users.use-case';

describe('FindAllUsersUseCase', () => {
  let findAllUsersUseCase: GetAllUsersUseCase;
  let userRepository: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUsersUseCase,
        {
          provide: 'IUserRepository',
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    findAllUsersUseCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
    userRepository = module.get<UserRepositoryMock>('IUserRepository');
  });

  it('should get all users', async () => {
    await userRepository.save(new User('John Doe', 'john@example.com'));
    await userRepository.save(new User('Jane Doe', 'jane@example.com'));
    const users = await findAllUsersUseCase.execute();
    expect(users.length).toBe(2);
  });
});
