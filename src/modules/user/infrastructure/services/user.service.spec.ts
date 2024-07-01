import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        CreateUserUseCase,
        GetUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        GetAllUsersUseCase,
        {
          provide: 'IUserRepository',
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepositoryMock>('IUserRepository');
  });

  it('should create a user', async () => {
    const user = await userService.createUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });
    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.password).toBe('password');
  });

  it('should get a user by id', async () => {
    const user = await userService.createUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });
    const foundUser = await userService.getUser(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toBe(user.id);
  });

  it('should get all users', async () => {
    await userService.createUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });
    await userService.createUser({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password',
    });
    const users = await userService.getAllUsers();
    expect(users.length).toBe(2);
  });

  it('should update a user', async () => {
    const user = await userService.createUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });
    const updatedUser = await userService.updateUser({
      id: user.id,
      name: 'John Smith',
      email: 'john@example.com',
      password: 'password',
    });
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('John Smith');
    expect(updatedUser.email).toBe('john@example.com');
    expect(updatedUser.password).toBe('password');
  });

  it('should delete a user', async () => {
    const user = await userService.createUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });

    const foundUser = await userService.getUser(user.id);
    expect(foundUser).toBeDefined();

    const deletedUser = await userService.deleteUser(user.id); // returns void
    expect(deletedUser).toBeUndefined();
  });
});
