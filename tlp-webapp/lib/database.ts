/**
 * Provides an instance of the Prisma client for database access.
 *
 * This module ensures that only one instance of {@link PrismaClient} is created and
 * re-used within the application. The instance is cached the first time that this
 * module is imported. Subsequent imports return the cached object.
 * The instance is saved on the global object in non-production environments to
 * prevent instantiating additional instances due to hot reloading.
 *
 * @see {@link https://www.prisma.io/docs/guides/performance-and-optimization/connection-management}
 * @see {@link https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices}
 *
 * @module
 * @author Marcel Herd
 */

import path from 'path';

import { PrismaClient } from '@prisma/client';

import { isDevl, isProd } from '@/lib/util';

declare global {
  // eslint-disable-next-line
  var prisma: PrismaClient | undefined;
}

const databaseUrl = isDevl()
  ? 'file:../../tlp-recorder/prisma/database.db'
  : `file:${path.join(process.cwd(), 'database.db')}`;

const prisma =
  global.prisma ||
  new PrismaClient({
    log: [],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

export default prisma;

if (!isProd()) global.prisma = prisma;
