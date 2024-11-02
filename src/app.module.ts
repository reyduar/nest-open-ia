import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { EnvConfiguration } from './config/env.config';
import { DamtechinkAssistantModule } from './damtechink-assistant/damtechink-assistant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    GptModule,
    HealthModule,
    DamtechinkAssistantModule,
  ],
  controllers: [],
})
export class AppModule {}
