import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository.interface';
import { BaseUseCase } from '@shared/use-case/base.use-case';

@Injectable()
export class DeleteUserUseCase implements BaseUseCase<string, void> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
