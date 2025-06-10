import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';

/**
 * @property {string} name - The user's full name. Cannot be empty.
 * @property {string} email - The user's email address. Must be a valid email format.
 * @property {Role} role - The user's role in the system. Must be one of the values defined in the Role enum.
 */
export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;
}
