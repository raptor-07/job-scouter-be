import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FetchJobsModule } from './fetch-jobs/fetch-jobs.module';

@Module({
  imports: [FetchJobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
