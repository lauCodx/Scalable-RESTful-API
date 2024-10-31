import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService:TaskService){}

  @Post()
  async createATask (@Body() createTaskDto: CreateTaskDto){
    return this.taskService.createTask(createTaskDto)
  }
 
}
