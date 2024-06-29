import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { UserService } from './infrastructure/services/user.service';
import { UserRepository } from './infrastructure/database/user.repository';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { UserInMemoryRepository } from './infrastructure/database/user-in-memory.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    // use cases
    CreateUserUseCase,
    GetUserUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
      // useClass: UserInMemoryRepository,
    },
  ],
})
export class UserModule {}
