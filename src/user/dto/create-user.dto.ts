import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString({each: true})
    readonly places: string[];

    @IsString({each:true})
    readonly photos: string[];
}