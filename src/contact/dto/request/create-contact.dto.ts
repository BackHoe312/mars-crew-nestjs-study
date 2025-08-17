import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    readonly phone: string;
}
