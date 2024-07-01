import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserUseCase } from './update-user.use-case';
import { User } from '../../../domain/user.entity';
import { IUserRepository } from '../../../domain/user.repository.interface';
import { CreateUserUseCase } from './create-user.use-case';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
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

    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    userRepository = module.get<IUserRepository>('IUserRepository');
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
