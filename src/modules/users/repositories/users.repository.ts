import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindUsersDto } from '../dto/find-users.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new user in the database.
   * @param data - The user data to create
   * @returns A promise that resolves to the created user
   */
  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  /**
   * Finds users based on provided filters and includes only their completed tasks.
   * @param filters - The filters to apply when searching for users
   * @returns A promise that resolves to an array of users with their completed tasks
   */
  async findAll(filters: FindUsersDto) {
    return this.prisma.user.findMany({
      where: {
        ...(filters.name && {
          name: { contains: filters.name, mode: 'insensitive' },
        }),
        ...(filters.email && {
          email: { contains: filters.email, mode: 'insensitive' },
        }),
        ...(filters.role && { role: filters.role }),
      },
      include: {
        tasks: {
          include: {
            task: true,
          },
        },
      },
    });
  }
}
