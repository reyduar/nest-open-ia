import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ConfigModule.forRoot(), GptModule, HealthModule],
  controllers: [],
})
export class AppModule {}
