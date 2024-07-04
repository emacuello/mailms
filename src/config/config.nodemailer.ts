import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import fetch from 'node-fetch';
import {
  API_OAUTH,
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  USER,
} from './env';

async function fetchAccessToken() {
  const response = await fetch(API_OAUTH, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${REFRESH_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch access token');
  }
  const data = await response.json();
  console.log(data.accessToken);
  return data.accessToken;
}

export const MailerConfig = {
  transport: {
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: USER,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: async () => {
        try {
          const accessToken = await fetchAccessToken();
          return accessToken;
        } catch (error) {
          console.error('Error fetching access token:', error);
          throw error;
        }
      },
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
