import { IsArray, IsString } from 'class-validator';

export class SummarizationDto {
  @IsString()
  readonly prompt: string;
  @IsString({ each: true })
  @IsArray()
  articles: string[];
}
