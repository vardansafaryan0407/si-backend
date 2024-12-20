import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class UserSignUpDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    country_id: number
}
