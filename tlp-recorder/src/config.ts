import fs from 'fs';
import path from 'path';

import YAML from 'yaml';

import getEnvironmentString, {
  getEnvironmentBool,
  getEnvironmentNumber,
} from '@/helpers/environment';

export const isDevl = () => process.env.NODE_ENV === 'development';

const developmentConfigPath = path.join(process.cwd(), '..', 'bin', 'config.yaml');
const prodConfigPath = path.join(process.cwd(), 'config.yaml');
const configFilePath = isDevl() ? developmentConfigPath : prodConfigPath;
const configContents = fs.readFileSync(configFilePath, 'utf8');
const configParsed = YAML.parse(configContents);

if (!configParsed.settings || !configParsed.settings.recorder) {
  throw new Error('config.yaml is corrupted, please re-install the application.');
}

const settings = configParsed.settings.recorder;

const config = {
  ENABLE_DB_SYNC: getEnvironmentBool('ENABLE_DB_SYNC', settings.enableDatabaseSync),
  ENABLE_NOTATION_SYNC: getEnvironmentBool('ENABLE_NOTATION_SYNC', settings.enableNotationSync),
  ENABLE_VIDEO_RECORD: getEnvironmentBool('ENABLE_VIDEO_RECORD', settings.enableVideoRecording),
  ENABLE_VIDEO_UPLOAD: getEnvironmentBool('ENABLE_VIDEO_UPLOAD', settings.enableVideoUpload),
  ENABLE_CLEANUP: getEnvironmentBool('ENABLE_CLEANUP', settings.enableCleanup),

  OBS_WS_PORT: getEnvironmentNumber('OBS_WS_PORT', settings.obsWebsocketPort),
  OBS_WS_PASSWORD: getEnvironmentString('OBS_WS_PASSWORD', settings.obsWebsocketPassword),
  OBS_RECORD_PATH: getEnvironmentString('OBS_RECORD_PATH', settings.recordingPath),
  OBS_BATCH_SIZE: getEnvironmentNumber('OBS_BATCH_SIZE', settings.matchesPerRecording),
  OBS_UPLOAD_DELAY: getEnvironmentNumber('OBS_UPLOAD_DELAY', settings.uploadDelay),
  OBS_CLEANUP_DELAY: getEnvironmentNumber('OBS_CLEANUP_DELAY', settings.cleanupDelay),

  DATABASE_URL: getEnvironmentString(
    'DATABASE_URL',
    isDevl() ? 'file:./database.db' : `file:${path.join(process.cwd(), 'database.db')}`,
  ),
  LOG_LEVEL: getEnvironmentString('LOG_LEVEL', settings.logLevel),
  TICK_INTERVAL: getEnvironmentNumber('TICK_INTERVAL', settings.tickInterval),
};

export default config;
