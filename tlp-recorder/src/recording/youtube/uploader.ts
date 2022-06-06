import fs from 'fs';

import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis/node_modules/google-auth-library';

import db from '@/database';
import log from '@/helpers/log';
import config from '@/config';
import getLatestVideoPath, { scheduleCleanup } from '@/recording/util';
import { VideoOptions } from '@/types/types';

export async function uploadVideo(
  client: OAuth2Client,
  path: string,
  options: VideoOptions,
  matchIds: number[],
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
      async (err, res) => {
        if (err) {
          log.error('Failed to upload recording', err);
        }

        const videoUrl = `https://www.youtube.com/watch?v=${res?.data.id}`;
        log.info(`Upload finished: ${videoUrl}`);

        if (matchIds && matchIds.length > 0) {
          await db.match.updateMany({
            where: {
              id: { in: [...matchIds] },
            },
            data: {
              recordingUrl: videoUrl,
            },
          });
          log.debug('Adding YouTube URL to matches', { matchIds });
        }

        if (config.ENABLE_CLEANUP) {
          scheduleCleanup(path);
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
  matchIds: number[],
): Promise<void> {
  const path = getLatestVideoPath();

  log.debug('Uploading to YouTube', { path });

  if (!path) {
    throw new Error('Did not find any video file to upload');
  }

  return uploadVideo(client, path, options, matchIds);
}
