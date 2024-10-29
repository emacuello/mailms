import 'dotenv/config';
import * as joi from 'joi';

interface Env {
  HOST_REDIS: string;
  PORT_REDIS: string;
  PASSWORD_REDIS: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  REFRESH_TOKEN: string;
  REDIRECT_URL: string;
  LOGO: string;
  MYEMAIL: string;
  API_OAUTH: string;
  MAILER_AUTH_USER: string;
  MAILER_AUTH_PASS: string;
}
const envsSchema = joi
  .object({
    HOST_REDIS: joi.string().required(),
    PORT_REDIS: joi.string().required(),
    PASSWORD_REDIS: joi.string().required(),
    CLIENT_ID: joi.string().required(),
    CLIENT_SECRET: joi.string().required(),
    REFRESH_TOKEN: joi.string().required(),
    REDIRECT_URL: joi.string().required(),
    LOGO: joi.string().required(),
    MYEMAIL: joi.string().required(),
    API_OAUTH: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const envs = value as Env;
