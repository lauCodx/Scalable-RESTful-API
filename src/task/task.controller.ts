import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from './dto/paginationDto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService:TaskService){}

  @Post()
  async createATask (@Body() createTaskDto: CreateTaskDto){
    return this.taskService.createTask(createTaskDto)
  }

  @Get()
  async fetchTask (@Query() paginationDto: PaginationDto){
    return this.taskService.getAllTask(paginationDto)
  }

  @Get(':id')
  async getTaskById (@Param('id') id: string){
    return this.taskService.getTasksById(id)
  }

  @Patch(':id')
  async updateTask (@Param('id') id:string, @Body() updateTaskDto: UpdateTaskDto){
    return this.taskService.updateTasks(id, updateTaskDto)
  }

  @Delete(':id')
  async deleteATask (@Param('id') id: string){
    return this.taskService.deleteTasks(id)
  }
 
}
