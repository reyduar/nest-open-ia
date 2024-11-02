import { Module } from '@nestjs/common';
import { DamtechinkAssistantService } from './damtechink-assistant.service';
import { DamtechinkAssistantController } from './damtechink-assistant.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [DamtechinkAssistantController],
  providers: [DamtechinkAssistantService],
  imports: [ConfigModule],
})
export class DamtechinkAssistantModule {}
