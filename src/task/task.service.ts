import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';
import { PaginationDto } from './dto/paginationDto';
import { ShareTaskDto } from './dto/share-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}

  async createTask (createTaskDto: Partial <CreateTaskDto> & {createdBy: string}){

    const {title, createdBy} = createTaskDto
    const find = await this.taskModel.findOne({title:title, createdBy: createdBy})
    if(find){
      throw new BadRequestException('This task is already created')
    };
  const task = await this.taskModel.create({
    ...createTaskDto,
    createdBy
  })
    return task;
  }

  async getAllTask (paginationDto: PaginationDto, userId:string){
   
    const user = await this.taskModel.findOne({createdBy: userId})
    if(!user){
      throw new UnauthorizedException('Not a valid user ID')
    }
    const {page =1, limit =10} = paginationDto;
    const skip = (page -1) * limit;

    const task = await this.taskModel
    .find({createdBy:userId})
    .skip(skip)
    .limit(limit)

    const total = await this.taskModel.countDocuments({createdBy: userId})
    return {
      task,
      total
    }
  }

  async getTasksByFilter (filter: {status: string, priority:string, tags:string[]}, userId: string){
    const user = await this.taskModel.findOne({createdBy: userId})
    if(!user){
      throw new UnauthorizedException ('Not permitted to access this route')
    }
    const {tags, ...filterObjects} = filter
    const query = {
      ...filterObjects,
      ...(tags? {tags: {$in: tags}} : {})
    }
    const filteredQuery = await this.taskModel.find(query)
    const countFilteredDocs = await this.taskModel.countDocuments(query)
    if(countFilteredDocs === 0){
      return 'No Task found'
    }

    return {
      countFilteredDocs,
      filteredQuery
    }
  }

  async getTasksById (id: string, userId: string){
    const checkId = await this.taskModel.findOne({createdBy: userId})
    if(!checkId){
      throw new UnauthorizedException('Not permitted!')
    }
    const find = await this.taskModel.findById({_id:id})
    if(!find){
      throw new NotFoundException("Task not found")
    }
    return find;
  }

  async sharedTask (shareTaskDto:ShareTaskDto, userId: string){
    const {taskId, recipientEmails} = shareTaskDto
    const task = await this.taskModel.findOne({_id: taskId, createdBy: userId})
    if(!task){
      throw new UnauthorizedException('Task not found or you are not permitted! to share this task')
    }
    task.shareTaskWith = task.shareTaskWith ? [...new Set([...task.shareTaskWith, ...recipientEmails])] : recipientEmails;
    await task.save();

    return {message: 'Task was shared successfully', sharedWith:task.shareTaskWith}

  }

  async updateTasks (id:string, updateTaskDto: UpdateTaskDto, userId: string){

    const find = await this.taskModel.findById({_id:id})
    if(!(find.createdBy.toString()=== userId)){
      throw new UnauthorizedException('You do not have access to update this task')
    }
    const updateTask = await this.taskModel.findByIdAndUpdate(id, 
    {$set: updateTaskDto}, {new:true})

    if(!updateTask){
      throw new NotFoundException('Task not found')
    }
    return updateTask
  }

  async deleteTasks (id:string, userId:string){

    const find = await this.taskModel.findById({_id:id})
    if(!(find.createdBy.toString()=== userId)){
      throw new UnauthorizedException('You do not have access to delete this task')
    }
    const deleteTask = await this.taskModel.findByIdAndDelete({_id:id})
    if(!deleteTask){
      throw new NotFoundException("Task not found")
    }
  }

}
