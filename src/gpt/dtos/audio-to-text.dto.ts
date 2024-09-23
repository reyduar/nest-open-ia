import { IsOptional, IsString } from 'class-validator';

export class AudioToTextDto {
  constructor(file: Express.Multer.File, prompt?: string) {
    this.file = file;
    this.prompt = prompt;
  }

  @IsString()
  @IsOptional()
  readonly prompt: string;

  @IsString()
  readonly file: Express.Multer.File;
}
