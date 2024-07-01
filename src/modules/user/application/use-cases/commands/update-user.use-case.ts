import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/user.repository.interface';
import { User } from '../../../domain/user.entity';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { BaseUseCase } from '@shared/use-case/base.use-case';

@Injectable()
export class UpdateUserUseCase implements BaseUseCase<UpdateUserDto, User> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.userRepository.update({
      id: updateUserDto.id,
      name: updateUserDto.name,
      email: updateUserDto.email,
      password: updateUserDto.password,
    });
  }
}
