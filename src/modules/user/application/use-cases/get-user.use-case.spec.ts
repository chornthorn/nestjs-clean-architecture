import { Test, TestingModule } from '@nestjs/testing';
import { GetUserUseCase } from './get-user.use-case';
import { UserRepositoryMock } from '../../infrastructure/database/user.repository.mock';
import { User } from '../../domain/user.entity';

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
  let userRepository: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserUseCase,
        {
          provide: 'IUserRepository',
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
    userRepository = module.get<UserRepositoryMock>('IUserRepository');
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
