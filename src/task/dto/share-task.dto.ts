import { ArrayNotEmpty, IsArray, IsEmail, IsString } from "class-validator";

export class ShareTaskDto {
    @IsString()
    taskId: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsEmail({}, {each:true})
    recipientEmails: string[]
}