import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class User extends Document{
    @Prop({required: false, unique: true})
    username: string;

    @Prop({required: true, unique: true, lowercase:true})
    email: string;

    @Prop({required: true})
    password: string

}

export const UserSchema = SchemaFactory.createForClass(User)