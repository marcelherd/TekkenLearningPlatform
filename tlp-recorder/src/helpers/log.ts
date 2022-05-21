import log from 'npmlog';

import getEnvironmentVariable from '@/helpers/environment';

log.level = getEnvironmentVariable('LOG_LEVEL', 'info');

export default {
  ...log,
  debug: (message: string, ...args: any[]) => {
    if (args.length > 0) log.verbose('', message, args);
    log.verbose('', message);
  },
  info: (message: string, ...args: any[]) => {
    if (args.length > 0) log.info('', message, args);
    log.info('', message);
  },
  warn: (message: string, ...args: any[]) => {
    if (args.length > 0) log.warn('', message, args);
    log.warn('', message);
  },
  error: (message: string, ...args: any[]) => {
    if (args.length > 0) log.error('', message, args);
    log.error('', message);
  },
};
