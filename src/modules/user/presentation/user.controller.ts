import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../infrastructure/services/user.service';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { GetUserDto } from '../application/dtos/get-user.dto';
import { UpdateUserDto } from '../application/dtos/update-user.dto';
import { DeleteUserDto } from '../application/dtos/delete-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUser(@Param() params: GetUserDto) {
    return this.userService.getUser(params.id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser({
      ...updateUserDto,
      id,
    });
  }

  @Delete(':id')
  async deleteUser(@Param() params: DeleteUserDto) {
    return this.userService.deleteUser(params.id);
  }
}
