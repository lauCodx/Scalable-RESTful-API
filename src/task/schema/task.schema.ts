import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Schema as MongooseSchema } from "mongoose";

@Schema({timestamps:true})
export class Task extends Document {
    @Prop({required: true, trim:true})
    title: string;

    @Prop({ required: true })
    description: string;
  
    @Prop({ required: true })
    dueDate: Date;
  
    @Prop({
      required: true,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    })
    
    status: 'pending' | 'in-progress' | 'completed';
  
    @Prop({ enum: ['low', 'medium', 'high'] })
    priority?: 'low' | 'medium' | 'high';

    @Prop({type: MongooseSchema.Types.ObjectId, required:true, ref:'User'})
    createdBy?:MongooseSchema.Types.ObjectId;

    @Prop({ match: /.+\@.+\..+/, message: "Must be an email"}) 
    assignedTo?: string; 
  
    @Prop({ type: [String], default: [] })
    tags?: string[];

    @Prop({type:[String], default:[]})
    shareTaskWith?:string[]
}



export const TaskSchema = SchemaFactory.createForClass(Task)

TaskSchema.index({createdBy:1})
TaskSchema.index({status:1})
TaskSchema.index({priority:1})
TaskSchema.index({dueDate:1})
TaskSchema.index({title:1})
TaskSchema.index({tags:1})
