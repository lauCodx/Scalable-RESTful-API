import { Request } from "express";

interface UserInterface{
    _id: string;
    email: string;
    username: string;
}

export interface AuthUser extends Request{
    user?: UserInterface;
}