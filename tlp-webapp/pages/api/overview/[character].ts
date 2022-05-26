import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@/lib/database';
import { CharacterSummary } from '@/pages/api/overview';
import { Match } from '@prisma/client';

export interface Matchup {
  character: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: Date;
  lastPlayedId: number;
}

export interface Stage {
  name: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: Date;
  lastPlayedId: number;
}

export interface Character extends CharacterSummary {
  latestMatches: Match[];
  matchups: Matchup[];
  stages: Stage[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CharacterSummary>
) {
  const limit = Number(req.query.limit);
  const characterName = req.query.character as string;

  const allMatches = await db.match.findMany({
    where: {
      playerCharacter: characterName,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const latestMatches = await db.match.findMany({
    where: {
      playerCharacter: characterName,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: isNaN(limit) ? 10 : limit,
  });

  const wins = allMatches.filter(
    (match) => match.playerRoundWins > match.opponentRoundWins
  ).length;
  const losses = allMatches.filter(
    (match) => match.playerRoundWins < match.opponentRoundWins
  ).length;
  const draws = allMatches.length - wins - losses;
  const [latestMatch] = allMatches;

  const playedOpponentCharacters = await db.match.groupBy({
    by: ['opponentCharacter'],
    where: {
      playerCharacter: characterName,
    },
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
  });

  const matchups = playedOpponentCharacters.map((result) => {
    const relevantMatches = allMatches.filter(
      (match) => match.opponentCharacter === result.opponentCharacter
    );
    const wins = relevantMatches.filter(
      (match) => match.playerRoundWins > match.opponentRoundWins
    ).length;
    const losses = relevantMatches.filter(
      (match) => match.playerRoundWins < match.opponentRoundWins
    ).length;
    const draws = relevantMatches.length - wins - losses;
    const [latestMatchForMatchup] = relevantMatches;

    return {
      character: result.opponentCharacter,
      games: result._count.id,
      wins,
      losses,
      draws,
      lastPlayed: latestMatchForMatchup.createdAt,
      lastPlayedId: latestMatchForMatchup.id,
    } as Matchup;
  });

  const playedStages = await db.match.groupBy({
    by: ['stage'],
    where: {
      playerCharacter: characterName,
    },
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
  });

  const stages = playedStages.map((result) => {
    const relevantMatches = allMatches.filter(
      (match) => match.stage === result.stage
    );
    const wins = relevantMatches.filter(
      (match) => match.playerRoundWins > match.opponentRoundWins
    ).length;
    const losses = relevantMatches.filter(
      (match) => match.playerRoundWins < match.opponentRoundWins
    ).length;
    const draws = relevantMatches.length - wins - losses;
    const [latestMatchForMatchup] = relevantMatches;

    return {
      name: result.stage,
      games: result._count.id,
      wins,
      losses,
      draws,
      lastPlayed: latestMatchForMatchup.createdAt,
      lastPlayedId: latestMatchForMatchup.id,
    } as Stage;
  });

  const character: Character = {
    name: characterName,
    games: allMatches.length,
    wins,
    losses,
    draws,
    lastPlayed: latestMatch.createdAt,
    lastPlayedId: latestMatch.id,
    latestMatches,
    matchups,
    stages,
  };

  res.status(200).json(character);
}
