import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistandId?: string;
}

export const createRunUseCase = async (openia: OpenAI, options: Options) => {
  const { threadId, assistandId = 'asst_wIQM62LbP7LMqkplwwalGSRz' } = options;
  const run = await openia.beta.threads.runs.create(threadId, {
    assistant_id: assistandId,
    // instructions: // sobreescribe el asistente OJO
  });

  console.log({ run });
  return run;
};
