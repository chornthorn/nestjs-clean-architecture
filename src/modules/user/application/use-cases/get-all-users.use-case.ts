import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository.interface';
import { User } from '../../domain/user.entity';
import { BaseUseCase } from '@shared/use-case/base.use-case';

@Injectable()
export class GetAllUsersUseCase implements BaseUseCase<void, User[]> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
