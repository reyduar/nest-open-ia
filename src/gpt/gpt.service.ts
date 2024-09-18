import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { orthographyUseCases } from './use-cases';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyUseCases(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }
}
