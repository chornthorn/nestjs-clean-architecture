import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { IUserRepository } from '../../domain/user.repository.interface';
import { PrismaService } from '@app/database';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async update(user: User): Promise<User> {
    return this.prismaService.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }

  async save(user: User): Promise<User> {
    return this.prismaService.user.create({ data: user });
  }

  async findById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
