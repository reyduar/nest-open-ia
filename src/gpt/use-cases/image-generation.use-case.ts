import OpenAI from 'openai';
import { downloadImageAsPng } from '../../helpers';

interface Options {
  prompt?: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt, originalImage, maskImage } = options;

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1024x1024',
    response_format: 'url',
    quality: 'standard',
  });

  // Guardar la imagen en el filesystem
  await downloadImageAsPng(response.data[0].url);
  return {
    url: response.data[0].url,
    localPath: '',
    revised_propmt: response.data[0].revised_prompt,
  };
};
