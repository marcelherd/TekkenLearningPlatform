import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/database';

export interface Rival {
  name: string;
  wins: number;
  losses: number;
  lastPlayed: Date;
}

export interface RivalsData {
  rivals: Rival[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RivalsData>
) {
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
    take: 10,
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
      const totalLosses = totalGames - totalWins;
      const lastPlayed = latestMatch.createdAt;

      return {
        name: rival.opponent,
        wins: totalWins,
        losses: totalLosses,
        lastPlayed,
      } as Rival;
    })
  );

  res.status(200).json({ rivals });
}
