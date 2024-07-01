import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../domain/user.entity';
import { CreateUserUseCase } from './create-user.use-case';
import { IUserRepository } from '../../domain/user.repository.interface';
import { DeleteUserUseCase } from './delete-user.use-case';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
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

    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    userRepository = module.get<IUserRepository>('IUserRepository');
  });

  it('should delete a user', async () => {
    const user = await userRepository.save(
      new User('John Doe', 'john@example.com'),
    );
    await deleteUserUseCase.execute(user.id);
    await expect(userRepository.findById(user.id)).resolves.toBeNull();
  });
});
