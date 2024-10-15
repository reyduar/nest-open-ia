export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:3000',
});
