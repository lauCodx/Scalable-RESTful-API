import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from './dto/paginationDto';
import { AuthGuard } from 'src/middleware/authGuard';
import { AuthUser } from 'src/auth/interface/user.interface';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService:TaskService){}

  @Post()
  async createATask (@Body() createTaskDto: CreateTaskDto, @Req() req:AuthUser){
    const userId = req.user._id
    return this.taskService.createTask({
      ...createTaskDto,
      createdBy: userId
    })
  }

  @Get()
  async fetchTask (@Query() paginationDto: PaginationDto, @Req() req:AuthUser){
    const userId = req.user._id
    return this.taskService.getAllTask(paginationDto, userId)
  }

  @Get(':id')
  async getTaskById (@Param('id') id: string, @Req() req: AuthUser){
    const userId = req.user._id
    return this.taskService.getTasksById(id, userId)
  }

  @Patch(':id')
  async updateTask (@Param('id') id:string, @Body() updateTaskDto: UpdateTaskDto, @Req() req:AuthUser){
    const userId = req.user._id
    return this.taskService.updateTasks(id, updateTaskDto, userId)
  }

  @Delete(':id')
  async deleteATask (@Param('id') id: string, @Req() req:AuthUser){
    const userId = req.user._id
    return this.taskService.deleteTasks(id, userId)
  }
 
}
