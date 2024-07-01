import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user.use-case';
import { IUserRepository } from '../../domain/user.repository.interface';
import { User } from '../../domain/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

const user = {
  id: '1',
  name: 'John Doe',
  email: 'jonhdoe@example.com',
  password: 'password',
};

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
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

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<IUserRepository>('IUserRepository');
  });

  it('should create a user successfully', async () => {
    const userDto: CreateUserDto = {
      ...user,
    };
    const expectedUser: User = {
      ...user,
    };

    jest.spyOn(userRepository, 'save').mockResolvedValueOnce(expectedUser);

    const result = await createUserUseCase.execute(userDto);

    expect(result).toEqual(expectedUser);
    expect(userRepository.save).toHaveBeenCalledWith(userDto);
  });

  it('should throw an error when user creation fails', async () => {
    const userDto: CreateUserDto = {
      ...user,
    };

    jest
      .spyOn(userRepository, 'save')
      .mockRejectedValueOnce(new Error('Failed to create user'));

    await expect(createUserUseCase.execute(userDto)).rejects.toThrow(
      'Failed to create user',
    );
    expect(userRepository.save).toHaveBeenCalledWith(userDto);
  });
});
