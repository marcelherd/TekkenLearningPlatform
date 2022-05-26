import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id as string);
  const match = await db.match.findUnique({ where: { id } });
  res.status(200).json(match);
}
