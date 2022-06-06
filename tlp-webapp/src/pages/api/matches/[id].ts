import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/database';
import { isNumeric } from '@/lib/util';
import { Match } from '@prisma/client';

async function handleGet(req: NextApiRequest, res: NextApiResponse<Match>) {
  if (!isNumeric(req.query.id as string)) {
    return res.status(400).end(`Invalid match id: ${req.query.id}`);
  }

  const id = Number(req.query.id as string);
  const match = await db.match.findUnique({ where: { id } });
  if (match) {
    return res.status(200).json(match);
  }
  return res.status(404);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  if (!isNumeric(req.query.id as string)) {
    return res.status(400).end(`Invalid match id: ${req.query.id}`);
  }

  const id = Number(req.query.id as string);
  const deleteMatch = await db.match.delete({
    where: {
      id,
    },
  });

  if (deleteMatch?.id) {
    return res.status(200).send('OK');
  }

  return res.status(500).send(`Could not delete match with id ${id}`);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      handleGet(req, res);
      break;
    case 'DELETE':
      handleDelete(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} not allowed`);
  }
}
