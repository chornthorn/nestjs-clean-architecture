import { User } from '../../domain/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository.interface';
import { BaseUseCase } from '@shared/use-case/base.use-case';

@Injectable()
export class GetUserUseCase implements BaseUseCase<string, User | null> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
