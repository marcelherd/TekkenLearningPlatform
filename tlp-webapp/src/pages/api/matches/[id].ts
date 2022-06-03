import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/database';
import { isNumeric } from '@/lib/util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isNumeric(req.query.id as string)) {
    return res.status(400).end(`Invalid match id: ${req.query.id}`);
  }

  const id = Number(req.query.id as string);
  const match = await db.match.findUnique({ where: { id } });
  res.status(200).json(match);
}
