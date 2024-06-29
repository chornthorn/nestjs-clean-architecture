import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../infrastructure/services/user.service';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { UserRepositoryMock } from '../infrastructure/database/user.repository.mock';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { UpdateUserDto } from '../application/dtos/update-user.dto';

const userDto = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password',
};

class MockUserService {
  createUser = jest.fn().mockResolvedValue(userDto);
  getUser = jest.fn().mockResolvedValue(userDto);
  getAllUsers = jest.fn().mockResolvedValue([userDto]);
  updateUser = jest.fn().mockResolvedValue(userDto);
  deleteUser = jest.fn().mockResolvedValue(undefined);
}

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: MockUserService,
        },
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

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      ...userDto,
    };
    const result = await userController.createUser(createUserDto);
    expect(result).toBeDefined();
    expect(result.name).toBe('John Doe');
    expect(result.email).toBe('john@example.com');
    expect(result.password).toBe('password');
  });

  it('should get a user by id', async () => {
    const user = await userService.createUser({
      ...userDto,
    });
    const foundUser = await userController.getUser({ id: user.id });
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toBe(user.id);
  });

  it('should get all users', async () => {
    await userService.createUser({
      ...userDto,
    });

    const users = await userController.getAllUsers();
    expect(users.length).toBe(1);
  });

  it('should update a user', async () => {
    const user = await userService.createUser({
      ...userDto,
    });
    const updateUserDto: UpdateUserDto = { id: user.id, name: 'John Smith' };
    const updatedUser = await userController.updateUser(user.id, updateUserDto);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('John Doe');
  });

  it('should delete a user', async () => {
    const user = await userService.createUser({
      ...userDto,
    });

    await userController.deleteUser({ id: user.id });
    expect(userService.deleteUser).toBeCalledWith(user.id);
  });
});
