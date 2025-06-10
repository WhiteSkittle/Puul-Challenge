import { IsOptional, IsString, IsInt, IsEnum, IsNumber, IsArray, IsDate } from 'class-validator';
import { TaskStatus } from '@prisma/client';
import { Transform } from 'class-transformer';

/**
 * Data Transfer Object for updating a task.
 *
 * @property {string} [title] - The title of the task (optional).
 * @property {string} [description] - The description of the task (optional).
 * @property {number} [estimatedHours] - The estimated hours to complete the task (optional).
 * @property {Date} [dueDate] - The due date for the task (optional).
 * @property {TaskStatus} [status] - The status of the task (optional).
 * @property {number} [cost] - The cost associated with the task (optional).
 * @property {number[]} [assignedUserIds] - Array of user IDs assigned to the task (optional).
 */
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  estimatedHours?: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  dueDate?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsArray()
  assignedUserIds?: number[];
}
