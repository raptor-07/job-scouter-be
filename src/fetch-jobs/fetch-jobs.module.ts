import { Module } from '@nestjs/common';
import { FetchJobsController } from './fetch-jobs/fetch-jobs.controller';

@Module({
  controllers: [FetchJobsController]
})
export class FetchJobsModule {}
