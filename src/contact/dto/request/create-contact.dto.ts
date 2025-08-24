import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: '홍길동', description: 'Contact Name' })
  @IsString()
  @MaxLength(64)
  readonly name: string;

  @ApiProperty({ example: '010-1234-5678', description: 'Phone number' })
  @IsString()
  @MaxLength(32)
  readonly phone: string;
}
