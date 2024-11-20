import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserInterfacesSignIn } from "../interface/user.interface";

export class SignInDto implements UserInterfacesSignIn  {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}