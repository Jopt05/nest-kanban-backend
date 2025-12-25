import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    @MinLength(4)
    email: string;

    @IsString()
    @MinLength(4)
    password: string;

}