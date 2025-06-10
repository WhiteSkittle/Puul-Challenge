import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from '../services/analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  /**
   * Retrieves the top users by completed tasks.
   * @returns Array of top users with completed task count and total cost
   */
  @Get('top-users')
  async getTopUsers() {
    return this.analyticsService.getTopUsersByCompletedTasks();
  }

  /**
   * Retrieves a monthly summary of completed tasks.
   * @returns Array of objects with month and completed task count
   */
  @Get('monthly-summary')
  async getMonthlySummary() {
    return this.analyticsService.getMonthlyCompletedTasksSummary();
  }
}
