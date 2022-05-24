import open from 'open';
import express from 'express';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis/node_modules/google-auth-library';

import credentials from '#/google.keys.json';
import log from '@/helpers/log';

const { OAuth2 } = google.auth;

const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];

export default async function getAuthenticatedClient(): Promise<OAuth2Client> {
  return new Promise((resolve, reject) => {
    const clientId = credentials.web.client_id;
    const clientSecret = credentials.web.client_secret;
    const [redirectUrl] = credentials.web.redirect_uris;

    const client = new OAuth2(clientId, clientSecret, redirectUrl);

    const authorizeUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    const app = express();

    const server = app.listen(5431, async () => {
      log.debug('Waiting for authorization code');

      const childProcess = await open(authorizeUrl, { wait: false });
      childProcess.unref();
    });

    app.get('/callback', async (req, res) => {
      const { code } = req.query;

      if (typeof code === 'string') {
        log.debug('Received authorization code');

        const result = await client.getToken(code);

        if (result.tokens.access_token) {
          client.setCredentials(result.tokens);

          log.debug('Retrieved access token');

          res.send('Authentication successful, you can close this page now.');
          server.close();
          resolve(client);
        } else {
          log.error('Failed to retrieve access token for authorization code', { code });

          res.status(400).send('Failed to retrieve access token');
          reject();
        }
      } else {
        log.error('Received invalid authorization code', { code });

        res.status(400).send('No code provided');
        reject();
      }
    });
  });
}
