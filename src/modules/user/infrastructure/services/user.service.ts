import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.use-case';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { GetUserByEmailUseCase } from '../../application/use-cases/get-user-by-email.use-case';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.getAllUsersUseCase.execute();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // check if user already exists
    const user = await this.getUserByEmailUseCase.execute(createUserDto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    try {
      return await this.createUserUseCase.execute(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUser(id: string) {
    const user = await this.getUserUseCase.execute(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User | null> {
    try {
      return await this.updateUserUseCase.execute(updateUserDto);
    } catch (error) {
      throw new BadRequestException(`Error updating user: ${error.message}`);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      return await this.deleteUserUseCase.execute(id);
    } catch (error) {
      throw new BadRequestException(`Error deleting user: ${error.message}`);
    }
  }
}
