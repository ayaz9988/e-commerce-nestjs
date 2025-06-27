import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class UserSigninDto {
    @IsNotEmpty({ message: "Email can not be empty" })
    @IsEmail({}, { message: "Email should be a string" })
    email: string;

    @IsNotEmpty({ message: "Password can not be empty" })
    @MinLength(6, { message: "Password minimum character should be 6." })
    password: string;
}