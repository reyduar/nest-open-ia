import { Body, Controller, Post } from '@nestjs/common';
import { DamtechinkAssistantService } from './damtechink-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('dante-assistant')
export class DamtechinkAssistantController {
  constructor(
    private readonly danteAssistantService: DamtechinkAssistantService,
  ) {}

  @Post('create-thread')
  async createThread() {
    return await this.danteAssistantService.createThread();
  }

  @Post('user-question')
  async createQuestion(@Body() questionDto: QuestionDto) {
    return await this.danteAssistantService.userQuestion(questionDto);
  }
}
