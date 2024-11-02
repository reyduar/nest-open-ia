import OpenAI from 'openai';

interface Options {
  threadId: string;
  runId?: string;
}

export const checkCompleteStatusUseCase = async (
  openia: OpenAI,
  options: Options,
) => {
  const { threadId, runId } = options;
  const runStatus = await openia.beta.threads.runs.retrieve(threadId, runId);

  console.log({ status: runStatus.status });

  if (runStatus.status === 'completed') {
    return runStatus;
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await checkCompleteStatusUseCase(openia, options);
};
