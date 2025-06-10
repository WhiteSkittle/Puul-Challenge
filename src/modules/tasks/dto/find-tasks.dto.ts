import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, IsDateString, IsDate } from 'class-validator';

/**
 * Data Transfer Object for filtering tasks.
 *
 * @property {string} [title] - Optional title of the task to filter by.
 * @property {Date} [dueDate] - Optional due date to filter tasks. Accepts a date string, transformed to a Date object.
 * @property {number} [userId] - Optional user ID to filter tasks by the assigned user.
 * @property {string} [userName] - Optional user name to filter tasks by the assigned user's name.
 * @property {string} [userEmail] - Optional user email to filter tasks by the assigned user's email.
 */
export class FilterTasksDto {
  @IsOptional()
  @IsString()
  title?: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  dueDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  userEmail?: string;
}
