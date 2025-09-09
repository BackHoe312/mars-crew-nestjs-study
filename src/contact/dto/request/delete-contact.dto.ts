import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class DeleteContactDto {
  @ApiProperty({
    example: '[1, 2, 3]',
    description: 'Contact id array to Delete',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}
