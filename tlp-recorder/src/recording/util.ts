import fs from 'fs';
import path from 'path';

import log from '@/helpers/log';
import config from '@/config';

export default function getLatestVideoPath() {
  const mostRecentFiles = fs
    .readdirSync(config.OBS_RECORD_PATH)
    .filter((file) => fs.lstatSync(path.join(config.OBS_RECORD_PATH, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(config.OBS_RECORD_PATH, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
    .map((file) => file.file);

  if (!mostRecentFiles.length) return null;

  const [fileName] = mostRecentFiles;
  return path.join(config.OBS_RECORD_PATH, fileName);
}

export function scheduleCleanup(filePath: string) {
  setTimeout(() => {
    log.debug('Deleting local recording', { filePath });
    fs.unlinkSync(filePath);
  }, config.OBS_CLEANUP_DELAY);
}

export function removeLatestVideo() {
  const videoPath = getLatestVideoPath();
  if (videoPath) {
    fs.unlinkSync(videoPath);
  }
}
