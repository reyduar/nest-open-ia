import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyUseCases = async (openai: OpenAI, options: Options) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    max_tokens: 1000,
    response_format: {
      type: 'json_object',
    },
    messages: [
      {
        role: 'system',
        content: `
        Te serán proveidos textos tanto en Inglés, Español y Portugués
        con posibles errores ortográficos y gramaticales,
        debes listar los errores que corregiste,
        tambien debes traducir a un Español del lunfardo argentino y al Portugués brasilero si el texto pasado es en Inglés,
        y debes traducir al Inglés urbano américano y Portugués brasilero si el texto pasado es Español ,
        y debes traducir al Inglés urbano américano y Español argentino si el texto pasado es Portugués.
        Debes de responder en formato JSON,
        tu tarea es corregirlos y retornar las traducciones mas precisas y mas urbana que existe,
        también puedes agregar sugerencias de variaciones para las traducciones de Inglés y Portugués.

        Ejemplo de salida:
        {
          correctedText: string,
          errorsCorrected: [],
          translations: [
          {language: "espanish", translation: string}
          {language: "english", translation: string}
          {language: "portuguese", translation: string}
          ],
          suggestions: [
          {language: "american_english", suggestion_1: string},
          {language: "american_english", suggestion_2: string},
          {language: "american_english", suggestion_3: string},
          {language: "brazilian_portuguese", suggestion_1: string},
          {language: "brazilian_portuguese", suggestion_2: string},
          {language: "brazilian_portuguese", suggestion_3: string},
          {language: "argentine_lunfardo", suggestion1: string},
          {language: "argentine_lunfardo", suggestion2: string},
          {language: "argentine_lunfardo", suggestion3: string}
          ]
          
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;
};
