interface Options {
  prompt: string;
}

export const orthographyUseCases = async (options: Options) => {
  const { prompt } = options;
  return { prompt };
};
