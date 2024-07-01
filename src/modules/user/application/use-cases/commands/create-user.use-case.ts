import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@shared/use-case/base.use-case';
import { IUserRepository } from '../../../domain/user.repository.interface';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '../../../domain/user.entity';

@Injectable()
export class CreateUserUseCase implements BaseUseCase<CreateUserDto, User> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save({
      ...createUserDto,
    });
  }
}
