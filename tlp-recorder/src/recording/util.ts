import fs from 'fs';
import path from 'path';

import getEnvironmentVariable from '@/helpers/environment';

const recordingFolderPath = getEnvironmentVariable('RECORDING_PATH', 'E:/Recording');

export default function getLatestVideoPath() {
  const mostRecentFiles = fs
    .readdirSync(recordingFolderPath)
    .filter((file) => fs.lstatSync(path.join(recordingFolderPath, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(recordingFolderPath, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
    .map((file) => file.file);

  if (!mostRecentFiles.length) return null;

  const [fileName] = mostRecentFiles;
  return path.join(recordingFolderPath, fileName);
}
