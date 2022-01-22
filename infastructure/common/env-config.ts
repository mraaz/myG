require('dotenv').config();

export interface AppConfig {
  ACCOUNT: string;
  REGION: string;
  STAGE: string;
  SECRET: string;
  TOKEN: string;
}

export const config = (): AppConfig => {
  const env = {
    ACCOUNT: process.env.ACCOUNT,
    REGION: process.env.REGION,
    STAGE: process.env.STAGE,
    SECRET: process.env.SECRET,
    TOKEN: process.env.TOKEN
  };

  for(const [key, value] of Object.entries(env)) {
    if (!value) {
      throw new Error(`missing environment variables '${key}', which is required.`);
    }
  }

  // We have type checked that this values exist already, so its safe to type cast here
  return env as AppConfig;
}
