import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';
import { PaginationDto } from './dto/paginationDto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}

  async createTask (createTaskDto: CreateTaskDto){

    const {title} = createTaskDto
    const find = await this.taskModel.findOne({title:title.toLowerCase()})
    if(find){
      throw new BadRequestException('This task is already created')
    };
    const task = await this.taskModel.create(createTaskDto)
    return task;

  }

  async getAllTask (paginationDto: PaginationDto){
    const {page =1, limit =10} = paginationDto;
    const skip = (page -1) * limit;

    const task = await this.taskModel
    .find()
    .skip(skip)
    .limit(limit)

    const total = await this.taskModel.countDocuments()
    return {
      task,
      total
    }
  }

  async getTasksById (id: string){
    const find = await this.taskModel.findById({_id:id})
    if(!find){
      throw new NotFoundException("Task not found")
    }
    return find;
  }

  async updateTasks (id:string, updateTaskDto: UpdateTaskDto){
    
    const updateTask = await this.taskModel.findByIdAndUpdate(id, 
    {$set: updateTaskDto}, {new:true})

    if(!updateTask){
      throw new NotFoundException('Task not found')
    }
    return updateTask
  }

}
