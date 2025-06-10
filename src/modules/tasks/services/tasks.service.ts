import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../repositories/tasks.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { FilterTasksDto } from '../dto/find-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  /**
   * Creates a new task with assigned users.
   * @param dto Data for creating the task
   * @returns The created task with assigned user details
   */
  async createTask(dto: CreateTaskDto) {
    return this.tasksRepository.create(dto);
  }

  /**
   * Finds tasks matching the provided filters.
   * @param filters Filter criteria for tasks
   * @returns Array of tasks with assigned user details
   */
  async findTasks(filters: FilterTasksDto) {
    return this.tasksRepository.findAll(filters);
  }

  /**
   * Updates a task and its assignments.
   * @param id Task ID
   * @param dto Data for updating the task
   * @returns The updated task with assigned user details
   */
  async updateTask(id: number, dto: UpdateTaskDto) {
    return this.tasksRepository.update(id, dto);
  }

  /**
   * Deletes a task and its assignments.
   * @param id Task ID
   * @returns The deleted task with assigned user details
   */
  async deleteTask(id: number) {
    return this.tasksRepository.delete(id);
  }
}
