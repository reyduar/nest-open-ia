import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, lang } = options;
  const message = `
  Traduce el siguiente texto al idioma ${lang}:${prompt}.
  


  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: message,
      },
    ],
  });

  return { translation: completion.choices[0].message.content };
};
