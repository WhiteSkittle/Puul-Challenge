import { Controller, Post, Body, Get, Query, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { FilterTasksDto } from '../dto/find-tasks.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Creates a new task.
   * @param dto Data for creating the task
   * @returns The created task with assigned user details
   */
  @Post()
  async createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  /**
   * Retrieves tasks matching the provided filters.
   * @param filters Query parameters for filtering tasks
   * @returns Array of tasks with assigned user details
   */
  @Get()
  async findTasks(@Query() filters: FilterTasksDto) {
    return this.tasksService.findTasks(filters);
  }

  /**
   * Updates a task by ID.
   * @param id Task ID
   * @param dto Data for updating the task
   * @returns The updated task with assigned user details
   */
  @Patch(':id')
  async updateTask(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, dto);
  }

  /**
   * Deletes a task by ID.
   * @param id Task ID
   * @returns The deleted task with assigned user details
   */
  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
