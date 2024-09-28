import * as path from 'path';
import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import {
  orthographyMarkdownUseCases,
  prosConsDicusserUseCase,
  prosConsDicusserStreamUseCase,
  summarizationUseCases,
  translateUseCase,
  textToAudioUseCase,
  audioToTextUseCase,
} from './use-cases';
import {
  AudioToTextDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  SummarizationDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyMarkdownUseCases(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  async translate({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, { prompt, lang });
  }

  async summarization({ prompt, articles }: SummarizationDto) {
    return await summarizationUseCases(this.openai, { prompt, articles });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async getTextToAudio(fileName: string) {
    const folderPath = path.join(
      __dirname,
      `/../../generated/audios/`,
      `${fileName}.mp3`,
    );
    const wasFileFound = fs.existsSync(folderPath);
    if (!wasFileFound)
      throw new NotFoundException(
        `File ${fileName} on path ${folderPath} not found`,
      );

    return folderPath;
  }

  async audioToText({ prompt, file }: AudioToTextDto) {
    return await audioToTextUseCase(this.openai, { prompt, file });
  }
}
