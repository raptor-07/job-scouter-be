import { Injectable } from '@nestjs/common';
import * as pdf from 'pdf-parse';

@Injectable()
export class ExtractKeywordService {
  async getKeywords(file: Express.Multer.File): Promise<string[]> {
    const data = await pdf(file.buffer);
    const skillsIndex = data.text.indexOf('Skills');

    const excludedKeywords = ['skills', 'languages', 'code', 'which', 'who', 'built', 'build', 'driven', 'tools', 'contribution', 'contributions', 'developed', 'won', 'chain', 'api', 'interaction', 'language', 'framework', 'frameworks', 'libraries'];


    const keywords = data.text.slice(skillsIndex, skillsIndex + 500)
      .split(/[\s\n,]/)
      .flatMap((word: any) => word.split('/'))
      .map((word: any) => word.replace(/[^a-zA-Z]/g, ''))
      .filter((word: any) => word && isNaN(Number(word)) && word.length > 2 && !excludedKeywords.includes(word.toLowerCase()))
      .map((word: any) => word.toLowerCase());

    console.log(keywords);

    return keywords;
  }
}