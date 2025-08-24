import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto {
  @ApiProperty({ example: '홍길동', description: 'Contact name to Update' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  readonly updateName?: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: 'Contact phone number to Update',
  })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  readonly updatePhone?: string;

  @ValidateIf((o) => !o.updateName && !o.updatePhone)
  @IsNotEmpty({ message: 'updateName 또는 updatePhone을 입력해야 합니다.' })
  readonly dummy?: any;
}
