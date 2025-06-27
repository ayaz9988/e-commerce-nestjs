import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator";
import { UserSigninDto } from "./user-signin.dto";
import { Roles } from "src/utility/common/user-roles.enum";

export class UserSignupDto extends UserSigninDto {
    @IsNotEmpty({ message: "Name can not be empty" })
    @IsString({ message: "Name should be a string" })
    name: string;

    // @IsOptional()
    // @IsString()
    // @IsEnum({ Roles })
    // roles?: string;
}