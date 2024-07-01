import { Test, TestingModule } from '@nestjs/testing';
import { GetUserUseCase } from './get-user.use-case';
import { User } from '../../../domain/user.entity';
import { IUserRepository } from '../../../domain/user.repository.interface';
import { CreateUserUseCase } from './create-user.use-case';

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
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

    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
    userRepository = module.get<IUserRepository>('IUserRepository');
  });

  it('should get a user by id', async () => {
    const user = await userRepository.save(
      new User('John Doe', 'john@example.com'),
    );
    const foundUser = await getUserUseCase.execute(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser).toBeInstanceOf(User);
    expect(foundUser.id).toBe(user.id);
  });
});
