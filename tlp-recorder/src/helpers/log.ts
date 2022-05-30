import log from 'npmlog';

import config from '@/config';

log.level = config.LOG_LEVEL;

// FIXME: For some reason any logging with args is output twice.
// The first time it includes args and the second time it does not.

export default {
  // ...log,
  silly: (message: string, ...args: any[]) => {
    if (args.length > 0) log.silly('', message, args);
    log.silly('', message);
  },
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
