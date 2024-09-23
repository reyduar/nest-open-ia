import OpenAI from 'openai';
import * as path from 'path';
import * as fs from 'fs';

interface Options {
  prompt?: string;
  file: Express.Multer.File;
}

export const audioToTextUseCase = async (openai: OpenAI, options: Options) => {
  // https://platform.openai.com/docs/guides/speech-to-text/prompting
  const { prompt, file } = options;
  // const prompting = `${prompt}`;

  const response = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: fs.createReadStream(file.path),
    prompt: prompt,
    language: 'en',
    // response_format: 'srt',
    response_format: 'verbose_json',
    // response_format: 'vtt',
  });

  return response;
};
