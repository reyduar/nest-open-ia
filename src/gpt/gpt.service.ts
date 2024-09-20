import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  orthographyUseCases,
  prosConsDicusserUseCase,
  prosConsDicusserStreamUseCase,
} from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, SummarizationDto } from './dtos';
import { SummarizationUseCases } from './use-cases/summarization.use-case';

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

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  async summarization({ prompt, articles }: SummarizationDto) {
    return await SummarizationUseCases(this.openai, { prompt, articles });
  }
}
