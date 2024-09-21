import OpenAI from 'openai';

interface Options {
  prompt: string;
  articles: string[];
}

export const summarizationUseCases = async (
  openai: OpenAI,
  options: Options,
) => {
  const promptContent = `
You will be provided with a topic and three related articles.
Your task is to summarize the articles in one response.
The summary must be concise, precise, and should not exceed 150 characters.
Your response must be in JSON format.

Here is the input data:
${JSON.stringify(options, null, 2)}

Output example:
        {
            summary: string
        }
`;

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
        content: promptContent,
      },
    ],
  });

  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;
};
