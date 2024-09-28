import OpenAI from 'openai';

interface Options {
  prompt: string;
}
export const orthographyMarkdownUseCases = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    max_tokens: 1000,
    messages: [
      {
        role: 'system',
        content: `
        Te serán proveidos textos tanto en Inglés, Español y Portugués
        con posibles errores ortográficos y gramaticales,
        debes listar los errores que corregiste,
        tambien debes traducir a un Español argentino y al Portugués brasilero si el texto pasado es en Inglés,
        y debes traducir al Inglés américano y Portugués brasilero si el texto pasado es Español ,
        y debes traducir al Inglés américano y Español argentino si el texto pasado es Portugués.
        Debes de responder en formato markdown,
        tu tarea es corregirlos y retornar las traducciones mas precisas y mas urbana que existe,
        también puedes agregar sugerencias de variaciones para las traducciones de Inglés y Portugués.

        Ejemplo de salida:
        
          Texto Corregido
          ---

          ----------------------------

          Errores Corregidos
          ---

          ----------------------------

          Traducciones
          ---

          ----------------------------
          
          Sugerencias Ingles
          ---
         
          ----------------------------

          Sugerencias Portugues
          ---
        
          ----------------------------

          Sugerencias Argentino
          ---
         
          ----------------------------
          
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return { content: completion.choices[0].message.content };
};

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
          {language: "american_english", suggestion: string},
          {language: "american_english", suggestion: string},
          {language: "american_english", suggestion: string},
          {language: "brazilian_portuguese", suggestion: string},
          {language: "brazilian_portuguese", suggestion: string},
          {language: "brazilian_portuguese", suggestion: string},
          {language: "argentine_lunfardo", suggestion: string},
          {language: "argentine_lunfardo", suggestion: string},
          {language: "argentine_lunfardo", suggestion: string}
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
