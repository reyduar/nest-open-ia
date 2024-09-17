import { Injectable } from '@nestjs/common';
import { orthographyUseCases } from './use-cases';

@Injectable()
export class GptService {
  async orthographyCheck() {
    return await orthographyUseCases();
  }
}
