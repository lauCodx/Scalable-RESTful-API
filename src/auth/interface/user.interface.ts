import { Request } from "express";

export interface UserInterface{
    _id: string;
    email: string;
    username: string;
}

export interface AuthUser extends Request{
    user?: UserInterface;
}

export interface UserInterfacesSignUp{
    email: string;
    username: string;
    password:string;
    confirmPassword: string;
}

export interface UserInterfacesSignIn{
    email: string;
    password: string;
   
}