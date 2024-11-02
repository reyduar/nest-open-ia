import OpenIA from 'openai';

interface Options {
  threadId: string;
}

export const getMessagesListUseCase = async (
  openia: OpenIA,
  options: Options,
) => {
  const { threadId } = options;
  const messagesList = await openia.beta.threads.messages.list(threadId);

  console.log({ messagesList });

  const messages = messagesList.data.map((message) => {
    return {
      role: message.role,
      content: message.content.map((content) => (content as any).text.value),
    };
  });

  return messages;
};
