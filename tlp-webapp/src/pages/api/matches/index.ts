import type { NextApiRequest, NextApiResponse } from 'next';

import { Match } from '@prisma/client';

import db from '@/lib/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Match[]>
) {
  const limit = Number(req.query.limit);

  if (isNaN(limit)) {
    const matches = await db.match.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(matches);
  } else {
    const matches = await db.match.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
    res.status(200).json(matches);
  }
}
