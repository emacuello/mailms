/* eslint-disable @typescript-eslint/no-unused-vars */
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { envs } from './env';
import axios from 'axios';

async function fetchAccessToken() {
  try {
    const response = await axios.get(envs.API_OAUTH, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${envs.REFRESH_TOKEN}`,
      },
    });

    const data = response.data;
    console.log(data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.error('Failed to fetch access token', error);
    throw new Error('Failed to fetch access token');
  }
}

export const MailerConfig = {
  transport: {
    host: 'smtp.gmail.com', //Servidor SMTP de Gmail
    port: 587, //Puerto para TLS
    secure: false, //False para TLS
    auth: {
      user: envs.MAILER_AUTH_USER,
      pass: envs.MAILER_AUTH_PASS,
      // type: 'OAuth2',
      // user: envs.USER_MAIL,
      // clientId: envs.CLIENT_ID,
      // clientSecret: envs.CLIENT_SECRET,
      // refreshToken: envs.REFRESH_TOKEN,
      // accessToken: async () => {
      //   try {
      //     const accessToken = await fetchAccessToken();
      //     return accessToken;
      //   } catch (error) {
      //     console.error('Error fetching access token:', error);
      //     throw error;
      //   }
      // },
    },
  },
  defaults: {
    from: '"No Reply" <no.reply@example.com>',
  },
  template: {
    dir: join(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
