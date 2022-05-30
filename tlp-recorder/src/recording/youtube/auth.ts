import fs from 'fs';
import path from 'path';

import open from 'open';
import express from 'express';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis/node_modules/google-auth-library';

import log from '@/helpers/log';
import config, { isDevl } from '@/config';
import { GoogleAuthConfig } from '@/types/types';

const { OAuth2 } = google.auth;

let credentials: GoogleAuthConfig;

if (config.ENABLE_VIDEO_UPLOAD) {
  const credentialFilePath = isDevl()
    ? path.join(process.cwd(), 'credentials', 'google.keys.json')
    : path.join(process.cwd(), 'google.keys.json');

  try {
    const credentialsExist = fs.existsSync(credentialFilePath);
    if (!credentialsExist) {
      log.error('File google.keys.json does not exist.');
      log.info('https://github.com/marcelherd/TekkenLearningPlatform/wiki/YouTube-Upload-Setup');
      process.exit(1);
    }

    fs.accessSync(credentialFilePath, fs.constants.R_OK);
  } catch (err) {
    log.error('File google.keys.json is not readable');
    process.exit(1);
  }

  const credentialContents: string = fs.readFileSync(credentialFilePath, 'utf8');
  credentials = JSON.parse(credentialContents);

  if (
    !credentials.web ||
    !(typeof credentials.web.client_id === 'string') ||
    !(typeof credentials.web.client_secret === 'string') ||
    !Array.isArray(credentials.web.redirect_uris)
  ) {
    throw new Error(
      'google.keys.json is corrupted, please re-download it from Google Cloud Console',
    );
  }

  if (credentials.web.redirect_uris.length < 1) {
    throw new Error(
      'Add http://localhost:5431 as redirect URL in Google Cloud Console then update google.keys.json',
    );
  }
}

export default async function getAuthenticatedClient(): Promise<OAuth2Client> {
  return new Promise((resolve, reject) => {
    const clientId = credentials.web.client_id;
    const clientSecret = credentials.web.client_secret;
    const [redirectUrl] = credentials.web.redirect_uris;

    const client = new OAuth2(clientId, clientSecret, redirectUrl);

    const authorizeUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/youtube.upload'],
    });

    const app = express();

    const server = app.listen(5431, async () => {
      log.debug('Waiting for authorization code');
      log.info('Please open this URL in your browser and sign in using your YouTube account:');
      log.info(authorizeUrl);

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
          log.info('Signed in, recordings will be uploaded to your YouTube channel.');

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
