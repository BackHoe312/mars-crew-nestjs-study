import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateContactDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    readonly updatePhone: string;
}
