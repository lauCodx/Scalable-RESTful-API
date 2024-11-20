import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength, ValidateIf } from "class-validator";
import { UserInterfacesSignUp } from "../interface/user.interface";

export class SignUpDto implements UserInterfacesSignUp {

    @IsString()
    @IsOptional()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(5, {message:"Password must be atleast 5 characters"})
    @Matches(/^(?=.*[0-9])/, {message:"Password must contain atleast one number"})
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ValidateIf((o) => o.password)
    confirmPassword:string;
}
