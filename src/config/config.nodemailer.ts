import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, USER } from './env';
import OAuth2Client from './config.oauthmail';

export const MailerConfig = {
  transport: {
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: USER,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: OAuth2Client.getAccessToken(),
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
