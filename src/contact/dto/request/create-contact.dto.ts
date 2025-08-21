import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateContactDto {
    @IsString()
    @MaxLength(64)
    readonly name: string;

    @IsString()
    @MaxLength(32)
    readonly phone: string;
}
