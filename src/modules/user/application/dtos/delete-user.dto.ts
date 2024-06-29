import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDto {
  @IsString()
  @ApiProperty({
    description: 'The user id',
    example: 'cp-1234567890',
  })
  id: string;
}
