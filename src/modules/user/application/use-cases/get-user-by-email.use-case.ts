import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '@shared/use-case/base.use-case';
import { IUserRepository } from '../../domain/user.repository.interface';

@Injectable()
export class GetUserByEmailUseCase implements BaseUseCase<any, any> {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string): Promise<any> {
    return await this.userRepository.findByEmail(email);
  }
}
