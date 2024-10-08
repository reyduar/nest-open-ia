import OpenAI from 'openai';
import { downloadBase64ImageAsPng, downloadImageAsPng } from '../../helpers';
import * as fs from 'fs';
import * as path from 'path';

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

  if (!originalImage && !maskImage) {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'url',
      quality: 'standard',
    });

    // Guardar la imagen en el filesystem
    const fileName = await downloadImageAsPng(response.data[0].url);
    const url = `${process.env.SERVER_URL}/gpt/image-generated/${fileName}`;
    return {
      url,
      openIAUrl: response.data[0].url,
      revised_propmt: response.data[0].revised_prompt,
    };
  }

  const pngImagePath = await downloadImageAsPng(originalImage, true);
  const maskImagePath = await downloadBase64ImageAsPng(maskImage, true);

  const response = await openai.images.edit({
    model: 'dall-e-2',
    prompt: prompt,
    image: fs.createReadStream(pngImagePath),
    mask: fs.createReadStream(maskImagePath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = await downloadImageAsPng(response.data[0].url);
  const url = `${process.env.SERVER_URL}/gpt/image-generated/${fileName}`;

  return {
    url,
    openIAUrl: response.data[0].url,
    revised_propmt: response.data[0].revised_prompt,
  };
};
