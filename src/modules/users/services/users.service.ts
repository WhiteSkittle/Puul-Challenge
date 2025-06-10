import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUsersDto } from '../dto/find-users.dto';
import { UserWithStats } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Creates a new user in the system.
   * @param createUserDto - The data transfer object containing user information.
   * @returns A promise that resolves to the created user.
   */
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  /**
   * Retrieves all users with their task statistics based on provided filters.
   * Calculates statistics such as completed task count and total cost of completed tasks.
   * @param filters - The criteria to filter users.
   * @returns A promise that resolves to an array of users with their task statistics.
   */
  async findAll(filters: FindUsersDto): Promise<UserWithStats[]> {
    const users = await this.usersRepository.findAll(filters);

    return users.map((user) => {
      const completedTasks = user.tasks.filter((t) => t.task.status === 'completed');
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        completedTasks: completedTasks.length,
        totalCost: completedTasks.reduce((sum, t) => sum + t.task.cost, 0),
      };
    });
  }
}
