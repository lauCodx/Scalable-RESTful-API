import { ArrayNotEmpty, IsArray, IsEmail, IsString } from "class-validator";

export class shareTaskDto {
    @IsString()
    taskId: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsEmail({}, {each:true})
    recipientEmails: string[]
}