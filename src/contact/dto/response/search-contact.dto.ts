import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchContactDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  phone?: string;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10;
}
