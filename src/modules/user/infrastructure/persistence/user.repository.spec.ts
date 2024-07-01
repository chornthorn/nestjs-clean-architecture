import { UserRepository } from './user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/database';

const user = {
  id: '1',
  name: 'John Doe',
  email: 'jonhdoe@example.com',
  password: 'password',
};

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, PrismaService],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should find all users', async () => {
    const users = [user, user];
    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(users);

    const foundUsers = await userRepository.findAll();

    expect(foundUsers).toEqual(users);
  });

  it('should update a user', async () => {
    const updatedUser = { ...user, name: 'Jane Doe' };
    jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser);

    const result = await userRepository.update(updatedUser);

    expect(result).toEqual(updatedUser);
  });

  it('should delete a user', async () => {
    jest.spyOn(prismaService.user, 'delete').mockResolvedValue(undefined);

    await userRepository.delete(user.id);

    expect(prismaService.user.delete).toHaveBeenCalledWith({
      where: { id: user.id },
    });
  });

  it('should find a user by id', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

    const foundUser = await userRepository.findById(user.id);

    expect(foundUser).toEqual(user);
  });

  it('should return null when no user is found by id', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    const foundUser = await userRepository.findById('non-existing-id');

    expect(foundUser).toBeNull();
  });
});
