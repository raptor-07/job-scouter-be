import { Module } from '@nestjs/common';
import { FetchJobsController } from './controllers/fetch-jobs.controller';
import { ExtractKeywordService } from './services/extract-keywords.service';
import { FetchJobsService } from './services/fetch-jobs.service';

@Module({
  controllers: [FetchJobsController],
  providers: [ExtractKeywordService, FetchJobsService],
})
export class FetchJobsModule { }
