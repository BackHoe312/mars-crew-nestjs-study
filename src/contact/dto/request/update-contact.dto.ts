import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { IsNotEmpty, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';

export class UpdateContactDto {
    @IsOptional()
    @IsString()
    @MaxLength(64)
    readonly updateName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(32)
    readonly updatePhone?: string;

    @ValidateIf(o => !o.updateName && !o.updatePhone)
    @IsNotEmpty({ message: 'updateName 또는 updatePhone을 입력해야 합니다.'})
    readonly dummy?: any;
}
