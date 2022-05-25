import fs from 'fs';
import path from 'path';

import log from '@/helpers/log';
import { RECORDING_DIR_PATH, CLEANUP_GRACE_PERIOD } from '@/config';

export default function getLatestVideoPath() {
  const mostRecentFiles = fs
    .readdirSync(RECORDING_DIR_PATH)
    .filter((file) => fs.lstatSync(path.join(RECORDING_DIR_PATH, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(RECORDING_DIR_PATH, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
    .map((file) => file.file);

  if (!mostRecentFiles.length) return null;

  const [fileName] = mostRecentFiles;
  return path.join(RECORDING_DIR_PATH, fileName);
}

export function scheduleCleanup(filePath: string) {
  setTimeout(() => {
    log.debug('Deleting local recording', { filePath });
    fs.unlinkSync(filePath);
  }, CLEANUP_GRACE_PERIOD);
}

export function cleanupRecordingFolder() {
  // TODO: Implement me
}

export function removeLatestVideo() {
  const videoPath = getLatestVideoPath();
  if (videoPath) {
    fs.unlinkSync(videoPath);
  }
}
