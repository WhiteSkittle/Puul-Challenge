import { IsString, IsNotEmpty, IsInt, IsEnum, IsArray, IsNumber, ArrayNotEmpty, IsDate } from 'class-validator';
import { TaskStatus } from '@prisma/client';
import { Transform, Type } from 'class-transformer';

/**
 * Data Transfer Object for creating a new task.
 *
 * @property {string} title - The title of the task. Must be a non-empty string.
 * @property {string} description - The description of the task. Must be a non-empty string.
 * @property {number} estimatedHours - The estimated number of hours to complete the task. Must be an integer.
 * @property {Date} dueDate - The due date for the task. Must be a valid date.
 * @property {TaskStatus} status - The current status of the task. Must be a valid TaskStatus enum value.
 * @property {number} cost - The cost associated with the task. Must be a number.
 * @property {number[]} assignedUserIds - Array of user IDs assigned to the task. Must be a non-empty array of numbers.
 */
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  estimatedHours: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  dueDate: Date;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNumber()
  cost: number;

  @IsArray()
  @ArrayNotEmpty()
  assignedUserIds: number[];
}
