import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExtractKeywordService } from '../services/extract-keywords.service';
import { FetchJobsService } from '../services/fetch-jobs.service';
@Controller('fetch-jobs')
export class FetchJobsController {
  constructor(
    private extractKeywordService: ExtractKeywordService,
    private fetchJobsService: FetchJobsService
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const keywords: string[] = await this.extractKeywordService.getKeywords(file);

    const jobs = await this.fetchJobsService.fetchJobs(keywords);

    return { jobs };

  }
}