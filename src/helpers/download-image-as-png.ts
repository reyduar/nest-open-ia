import { InternalServerErrorException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

export const downloadImageAsPng = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new InternalServerErrorException('Failed to download image');
  }

  const folterPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folterPath, { recursive: true });

  const imageNamePng = `${new Date().getTime()}.png`;
  const buffer = Buffer.from(await response.arrayBuffer());
  // fs.writeFileSync(`${folterPath}/${imageNamePng}`, buffer);
  const completePath = path.join(folterPath, imageNamePng);
  await sharp(buffer).png().ensureAlpha().toFile(completePath);
  return imageNamePng;
};
