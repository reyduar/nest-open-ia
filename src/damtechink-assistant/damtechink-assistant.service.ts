import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import {
  checkCompleteStatusUseCase,
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessagesListUseCase,
} from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class DamtechinkAssistantService {
  private openai: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async createThread() {
    return createThreadUseCase(this.openai);
  }

  async userQuestion(questionDto: QuestionDto) {
    const { threadId, question } = questionDto;
    const message = await createMessageUseCase(this.openai, {
      threadId,
      question,
    });

    const run = await createRunUseCase(this.openai, {
      threadId,
    });

    await checkCompleteStatusUseCase(this.openai, {
      threadId,
      runId: run.id,
    });

    const messages = await getMessagesListUseCase(this.openai, {
      threadId,
    });

    return messages;
  }
}
