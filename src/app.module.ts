import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    GptModule,
    HealthModule,
  ],
  controllers: [],
})
export class AppModule {}
