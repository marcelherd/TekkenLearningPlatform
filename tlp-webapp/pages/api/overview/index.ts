import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/database';

export interface CharacterSummary {
  name: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: Date;
  lastPlayedId: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CharacterSummary[]>
) {
  const playedCharacters = await db.match.groupBy({
    by: ['playerCharacter'],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
  });

  const characters: CharacterSummary[] = await Promise.all(
    playedCharacters.map(async (result) => {
      const allMatches = await db.match.findMany({
        where: {
          playerCharacter: result.playerCharacter,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const wins = allMatches.filter(
        (match) => match.playerRoundWins > match.opponentRoundWins
      ).length;
      const losses = allMatches.filter(
        (match) => match.playerRoundWins < match.opponentRoundWins
      ).length;
      const draws = allMatches.length - wins - losses;
      const [latestMatch] = allMatches;

      return {
        name: result.playerCharacter,
        games: allMatches.length,
        wins,
        losses,
        draws,
        lastPlayed: latestMatch.createdAt,
        lastPlayedId: latestMatch.id,
      } as CharacterSummary;
    })
  );

  res.status(200).json(characters);
}
