import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchContactDto {
  @ApiProperty({
    example: '홍길동',
    description: 'Contact name',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: 'Contact phone number',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: '1',
    description: 'page',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    example: '10',
    description: 'page limit',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10;
}
