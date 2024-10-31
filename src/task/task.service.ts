import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<Task>){}

  async createTask (createTaskDto: CreateTaskDto){

    const {title} = createTaskDto
    const find = await this.TaskModel.findOne({title:title.toLowerCase()})
    if(find){
      throw new BadRequestException('This task is already created')
    };
    const task = await this.TaskModel.create(createTaskDto)
    return task;

  }
}
