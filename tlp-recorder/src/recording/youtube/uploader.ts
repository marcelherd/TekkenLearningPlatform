import fs from 'fs';

import { google } from 'googleapis';

import log from '@/helpers/log';
import getLatestVideoPath from '@/recording/util';
import getAuthenticatedClient from '@/recording/youtube/auth';

export interface VideoOptions {
  title: string;
  description?: string;
  tags?: string[];
  categoryId?: string;
  privacyStatus?: 'public' | 'unlisted' | 'private';
}

async function uploadVideo(path: string, options: VideoOptions): Promise<void> {
  const client = await getAuthenticatedClient();

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
        log.error(`Video upload failed: ${err.message}`);
      }
      const videoUrl = `https://www.youtube.com/watch?v=${res?.data.id}`;
      log.debug(`Video uploaded and available at ${videoUrl}`);
    },
  );
}

export default async function uploadLatestVideo(options: VideoOptions): Promise<void> {
  const path = getLatestVideoPath();

  if (!path) {
    throw new Error('Did not find any video file to upload');
  }

  return uploadVideo(path, options);
}
