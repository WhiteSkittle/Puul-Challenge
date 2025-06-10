import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

/**
 * @property {string} [name] - Optional. Filter users by name.
 * @property {string} [email] - Optional. Filter users by email address.
 * @property {Role} [role] - Optional. Filter users by their role.
 */
export class FindUsersDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
