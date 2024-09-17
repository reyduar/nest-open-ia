import { Injectable } from '@nestjs/common';
import { orthographyUseCases } from './use-cases';
import { OrthographyDto } from './dtos';

@Injectable()
export class GptService {
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyUseCases({
      prompt: orthographyDto.prompt,
    });
  }
}
