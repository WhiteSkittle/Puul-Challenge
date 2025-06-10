import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { subMonths, startOfMonth } from 'date-fns';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves the top users ranked by the number of completed tasks.
   * Optimized: Usa groupBy para contar y una sola consulta adicional para sumar costos.
   * @param limit Maximum number of users to return (default: 5)
   * @returns Array of users with completed task count and total cost
   */
  async getTopUsersByCompletedTasks(limit = 5) {
    const assignments = await this.prisma.taskAssignment.findMany({
      where: {
        task: { status: 'completed' },
      },
      include: {
        user: true,
        task: true,
      },
    });

    const userMap = new Map<number, { name: string; completedTasks: number; totalCost: number }>();

    for (const a of assignments) {
      const existing = userMap.get(a.user.id);
      if (existing) {
        existing.completedTasks += 1;
        existing.totalCost += a.task.cost;
      } else {
        userMap.set(a.user.id, {
          name: a.user.name,
          completedTasks: 1,
          totalCost: a.task.cost,
        });
      }
    }

    return [...userMap.entries()]
      .map(([userId, data]) => ({ userId, ...data }))
      .sort((a, b) => b.completedTasks - a.completedTasks)
      .slice(0, limit);
  }

  /**
   * Returns a summary of completed tasks per month for the last N months.
   * @param months Number of months to include in the summary (default: 6)
   * @returns Array of objects with month and completed task count
   */
  async getMonthlyCompletedTasksSummary(months = 6) {
    const from = new Date();
    from.setMonth(from.getMonth() - (months - 1));
    from.setDate(1);
    from.setHours(0, 0, 0, 0);

    const tasks = await this.prisma.task.findMany({
      where: {
        status: 'completed',
        dueDate: { gte: from },
      },
      select: {
        dueDate: true,
      },
    });

    const summary: Record<string, number> = {};

    for (const t of tasks) {
      const d = new Date(t.dueDate);
      const key = `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1).toString().padStart(2, '0')}`;
      summary[key] = (summary[key] || 0) + 1;
    }

    return Object.entries(summary).map(([month, count]) => ({ month, count }));
  }
}
