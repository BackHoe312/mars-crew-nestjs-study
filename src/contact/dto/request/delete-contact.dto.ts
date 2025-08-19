import { IsArray, IsNumber } from "class-validator";

export class DeleteContactDto {
    @IsArray()
    @IsNumber({}, {each: true})
    ids: number[];
}