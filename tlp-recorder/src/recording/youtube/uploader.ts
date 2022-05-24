import fs from 'fs';

import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis/node_modules/google-auth-library';

import log from '@/helpers/log';
import getEnvironmentVariable, { isFlagSet } from '@/helpers/environment';
import getLatestVideoPath from '@/recording/util';

export interface VideoOptions {
  title: string;
  description?: string;
  tags?: string[];
  categoryId?: string;
  privacyStatus?: 'public' | 'unlisted' | 'private';
}

const CLEANUP_ENABLED = isFlagSet('CLEANUP_ENABLED', true);
const CLEANUP_GRACE_PERIOD = Number(getEnvironmentVariable('CLEANUP_GRACE_PERIOD', '5000'));

async function uploadVideo(
  client: OAuth2Client,
  path: string,
  options: VideoOptions,
): Promise<void> {
  try {
    const service = google.youtube({
      version: 'v3',
      auth: client,
    });

    service.videos.insert(
      {
        part: ['snippet', 'status'],
        requestBody: {
          snippet: {
            title: options.title,
            description: options.description,
            tags: options.tags,
            categoryId: options.categoryId ?? '24',
            defaultLanguage: 'en',
            defaultAudioLanguage: 'en',
          },
          status: {
            privacyStatus: options.privacyStatus ?? 'private',
          },
        },
        media: {
          body: fs.createReadStream(path),
        },
      },
      (err, res) => {
        if (err) {
          log.error('Failed to upload recording', err);
        }

        const videoUrl = `https://www.youtube.com/watch?v=${res?.data.id}`;
        log.info('Recording uploaded', { videoUrl });

        if (CLEANUP_ENABLED) {
          // Generous grace period as I noticed there were some issues with processing
          // which may or may not have been related.
          setTimeout(() => {
            log.info('Deleting local recording', { path });
            fs.unlinkSync(path);
          }, CLEANUP_GRACE_PERIOD);
        }
      },
    );
  } catch (err) {
    log.error('Failed to upload video', err);
  }
}

export default async function uploadLatestVideo(
  client: OAuth2Client,
  options: VideoOptions,
): Promise<void> {
  const path = getLatestVideoPath();

  log.debug('Uploading to YouTube', { path });

  if (!path) {
    throw new Error('Did not find any video file to upload');
  }

  return uploadVideo(client, path, options);
}
