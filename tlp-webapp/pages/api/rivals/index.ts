import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/database';

export interface Rival {
  name: string;
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: Date;
  lastPlayedId: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Rival[]>
) {
  const limit = Number(req.query.limit);

  const mostPlayed = await db.match.groupBy({
    by: ['opponent'],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
    take: isNaN(limit) ? 10 : limit,
  });

  const rivals = await Promise.all(
    mostPlayed.map(async (rival) => {
      const allMatches = await db.match.findMany({
        where: {
          opponent: rival.opponent,
        },
      });
      const [latestMatch] = await db.match.findMany({
        where: {
          opponent: rival.opponent,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      });

      const totalGames = rival._count.id;
      const totalWins = allMatches.filter(
        ({ playerRoundWins, opponentRoundWins }) =>
          playerRoundWins > opponentRoundWins
      ).length;
      const totalLosses = allMatches.filter(
        ({ playerRoundWins, opponentRoundWins }) =>
          playerRoundWins < opponentRoundWins
      ).length;
      const totalDraws = totalGames - totalWins - totalLosses;
      const lastPlayed = latestMatch.createdAt;

      return {
        name: rival.opponent,
        wins: totalWins,
        losses: totalLosses,
        draws: totalDraws,
        lastPlayed,
        lastPlayedId: latestMatch.id,
      } as Rival;
    })
  );

  res.status(200).json(rivals);
}
