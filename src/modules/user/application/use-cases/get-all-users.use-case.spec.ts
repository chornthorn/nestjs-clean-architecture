import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../domain/user.entity';
import { GetAllUsersUseCase } from './get-all-users.use-case';
import { IUserRepository } from '../../domain/user.repository.interface';
import { CreateUserUseCase } from './create-user.use-case';

describe('FindAllUsersUseCase', () => {
  let getAllUsersUseCase: GetAllUsersUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'IUserRepository',
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    getAllUsersUseCase = module.get<GetAllUsersUseCase>(GetAllUsersUseCase);
    userRepository = module.get<IUserRepository>('IUserRepository');
  });

  it('should get all users', async () => {
    await userRepository.save(new User('John Doe', 'john@example.com'));
    await userRepository.save(new User('Jane Doe', 'jane@example.com'));
    const users = await getAllUsersUseCase.execute();
    expect(users.length).toBe(2);
  });
});
