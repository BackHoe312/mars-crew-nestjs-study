import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SaveUserDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'User Email' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: '홍길동', description: 'User Name' })
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiProperty({ example: '12345', description: 'User Password' })
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  password: string;
}
