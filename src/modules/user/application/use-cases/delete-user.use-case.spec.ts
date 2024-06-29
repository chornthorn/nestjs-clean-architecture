import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserUseCase } from './delete-user.use-case';
import { UserRepositoryMock } from '../../infrastructure/database/user.repository.mock';
import { User } from '../../domain/user.entity';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let userRepository: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: 'IUserRepository',
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    userRepository = module.get<UserRepositoryMock>('IUserRepository');
  });

  it('should delete a user', async () => {
    const user = await userRepository.save(
      new User('John Doe', 'john@example.com'),
    );
    await deleteUserUseCase.execute(user.id);
    await expect(userRepository.findById(user.id)).resolves.toBeNull();
  });
});
