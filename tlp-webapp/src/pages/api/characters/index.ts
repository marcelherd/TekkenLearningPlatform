import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/database';
import { Character } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Character[]>) {
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

  const characters: Character[] = await Promise.all(
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
        (match) => match.playerRoundWins > match.opponentRoundWins,
      ).length;
      const losses = allMatches.filter(
        (match) => match.playerRoundWins < match.opponentRoundWins,
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
      } as Character;
    }),
  );

  res.status(200).json(characters);
}
