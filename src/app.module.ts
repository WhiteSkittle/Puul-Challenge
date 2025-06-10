import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [UsersModule, TasksModule, AnalyticsModule],
})
export class AppModule {}
