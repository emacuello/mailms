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
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: envs.USER,
      clientId: envs.CLIENT_ID,
      clientSecret: envs.CLIENT_SECRET,
      refreshToken: envs.REFRESH_TOKEN,
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
