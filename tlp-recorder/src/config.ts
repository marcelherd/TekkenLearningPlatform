import getEnvironmentVariable, { isFlagSet } from '@/helpers/environment';

// TODO: add logging and more user-friendly config

export const SYNC_NOTATION = isFlagSet('SYNC_NOTATION', false);
export const SYNC_DATABASE = isFlagSet('SYNC_DATABASE', true);
export const RECORD_VIDEOS = isFlagSet('RECORD_VIDEOS', false);
export const UPLOAD_VIDEOS = isFlagSet('UPLOAD_VIDEOS', false);
export const CLEANUP_ENABLED = isFlagSet('CLEANUP_ENABLED', true);

export const CLEANUP_GRACE_PERIOD = Number(getEnvironmentVariable('CLEANUP_GRACE_PERIOD', '5000'));
export const TICK_INTERVAL = Number(getEnvironmentVariable('TICK_INTERVAL', '1'));
export const OBS_GRACE_PERIOD = Number(getEnvironmentVariable('OBS_GRACE_PERIOD', '500'));
export const MAX_BATCH_SIZE = Number(getEnvironmentVariable('MAX_BATCH_SIZE', '10'));

export const RECORDING_DIR_PATH = getEnvironmentVariable('RECORDING_DIR_PATH', 'E:/Recording/TLP');
