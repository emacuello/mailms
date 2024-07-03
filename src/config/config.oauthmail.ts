import { google } from 'googleapis';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN } from './env';

const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
);

OAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

export default OAuth2Client;
