import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { FilterTasksDto } from '../dto/find-tasks.dto';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Validates that all provided user IDs exist in the database.
   * Throws NotFoundException if any user is missing.
   * @param userIds Array of user IDs to validate
   */
  private async validateUserIdsExist(userIds: number[]): Promise<void> {
    if (!userIds || userIds.length === 0) return;

    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true },
    });

    const foundIds = users.map((u) => u.id);
    const notFound = userIds.filter((id) => !foundIds.includes(id));

    if (notFound.length > 0) {
      throw new NotFoundException('Some of the provided users were not found.');
    }
  }

  /**
   * Creates a new task and assigns users to it.
   * @param createTaskDto Data for creating the task, including assigned user IDs
   * @returns The created task with assigned user details
   */
  async create(createTaskDto: CreateTaskDto) {
    const { assignedUserIds, ...taskData } = createTaskDto;

    await this.validateUserIdsExist(assignedUserIds);

    const task = await this.prisma.task.create({
      data: {
        ...taskData,
        assignedUsers: {
          create: assignedUserIds.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
      include: {
        assignedUsers: {
          select: {
            user: true,
          },
        },
      },
    });

    return {
      ...task,
      assignedUsers: task.assignedUsers.map((a) => a.user),
    };
  }

  /**
   * Retrieves all tasks matching the provided filters.
   * Supports filtering by title, due date, user ID, email, or name.
   * @param filters FilterTasksDto with optional filter fields
   * @returns Array of tasks with assigned user details
   */
  async findAll(filters: FilterTasksDto) {
    const tasks = await this.prisma.task.findMany({
      where: {
        ...(filters.title && {
          title: { contains: filters.title, mode: 'insensitive' },
        }),
        ...(filters.dueDate && {
          dueDate: new Date(filters.dueDate),
        }),
        ...(filters.userId && {
          assignedUsers: { some: { userId: filters.userId } },
        }),
        ...(!filters.userId &&
          (filters.userEmail || filters.userName) && {
            assignedUsers: {
              some: {
                user: {
                  ...(filters.userEmail && {
                    email: { contains: filters.userEmail, mode: 'insensitive' },
                  }),
                  ...(filters.userName && {
                    name: { contains: filters.userName, mode: 'insensitive' },
                  }),
                },
              },
            },
          }),
      },
      orderBy: {
        dueDate: 'asc',
      },
      include: {
        assignedUsers: {
          select: {
            user: true,
          },
        },
      },
    });
    return tasks.map((task) => ({
      ...task,
      assignedUsers: task.assignedUsers.map((a) => a.user),
    }));
  }

  /**
   * Updates a task and its assigned users.
   * If assignedUserIds is provided, replaces all assignments.
   * @param id Task ID to update
   * @param dto UpdateTaskDto with new data and optional assigned user IDs
   * @returns The updated task with assigned user details
   */
  async update(id: number, dto: UpdateTaskDto) {
    const { assignedUserIds, ...updateData } = dto;

    if (assignedUserIds) {
      await this.validateUserIdsExist(assignedUserIds);
      await this.prisma.taskAssignment.deleteMany({ where: { taskId: id } });
    }

    const task = await this.prisma.task.update({
      where: { id },
      data: {
        ...updateData,
        ...(assignedUserIds && {
          assignedUsers: {
            create: assignedUserIds.map((userId) => ({
              user: { connect: { id: userId } },
            })),
          },
        }),
      },
      include: {
        assignedUsers: {
          select: {
            user: true,
          },
        },
      },
    });
    return {
      ...task,
      assignedUsers: task.assignedUsers.map((a) => a.user),
    };
  }

  /**
   * Deletes a task and its user assignments.
   * @param id Task ID to delete
   * @returns The deleted task with assigned user details
   */
  async delete(id: number) {
    await this.prisma.taskAssignment.deleteMany({
      where: { taskId: id },
    });

    const task = await this.prisma.task.delete({
      where: { id },
      include: {
        assignedUsers: {
          select: {
            user: true,
          },
        },
      },
    });
    return {
      ...task,
      assignedUsers: task.assignedUsers.map((a) => a.user),
    };
  }
}
