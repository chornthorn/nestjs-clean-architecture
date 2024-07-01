import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { UserService } from './infrastructure/services/user.service';
import { GetUserUseCase } from './application/use-cases/queries/get-user.use-case';
import { GetAllUsersUseCase } from './application/use-cases/queries/get-all-users.use-case';
import { UpdateUserUseCase } from './application/use-cases/commands/update-user.use-case';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { GetUserByEmailUseCase } from './application/use-cases/queries/get-user-by-email.use-case';
import { CreateUserUseCase } from './application/use-cases/commands/create-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/commands/delete-user.use-case';

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
    GetUserByEmailUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
      // useClass: UserInMemoryRepository,
    },
  ],
})
export class UserModule {}
