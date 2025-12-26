import { IsBoolean, IsString } from "class-validator";


export class CreateSubtaskDto {

    @IsString()
    title: string;

    @IsBoolean()
    isCompleted: boolean;

}