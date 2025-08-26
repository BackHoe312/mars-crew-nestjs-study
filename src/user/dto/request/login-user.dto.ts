import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'User email' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: '12345', description: 'User password' })
  @IsString()
  @MaxLength(255)
  password: string;
}
