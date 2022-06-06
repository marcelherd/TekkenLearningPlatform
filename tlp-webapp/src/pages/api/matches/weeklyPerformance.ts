import type { NextApiRequest, NextApiResponse } from 'next';

import sub from 'date-fns/sub';

import db from '@/lib/database';
import { WeeklyPerformanceResponse } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeeklyPerformanceResponse>,
) {
  const today = new Date();
  const lastWeek = sub(today, { weeks: 1 });
  const twoWeeksAgo = sub(today, { weeks: 2 });
  const threeWeeksAgo = sub(today, { weeks: 3 });

  const matchesThisWeek = await db.match.findMany({
    where: {
      createdAt: {
        gte: lastWeek,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const winsThisWeek = matchesThisWeek.filter(
    (match) => match.playerRoundWins > match.opponentRoundWins,
  );
  const lossesThisWeek = matchesThisWeek.filter(
    (match) => match.playerRoundWins < match.opponentRoundWins,
  );
  const drawsThisWeek = matchesThisWeek.filter(
    (match) => match.playerRoundWins === match.opponentRoundWins,
  );

  const matchesLastWeek = await db.match.findMany({
    where: {
      createdAt: {
        gte: twoWeeksAgo,
        lt: lastWeek,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const winsLastWeek = matchesLastWeek.filter(
    (match) => match.playerRoundWins > match.opponentRoundWins,
  );
  const lossesLastWeek = matchesLastWeek.filter(
    (match) => match.playerRoundWins < match.opponentRoundWins,
  );
  const drawsLastWeek = matchesLastWeek.filter(
    (match) => match.playerRoundWins === match.opponentRoundWins,
  );

  const matchesTwoWeeksAgo = await db.match.findMany({
    where: {
      createdAt: {
        gte: threeWeeksAgo,
        lt: twoWeeksAgo,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const winsTwoWeeksAgo = matchesTwoWeeksAgo.filter(
    (match) => match.playerRoundWins > match.opponentRoundWins,
  );
  const lossesTwoWeeksAgo = matchesTwoWeeksAgo.filter(
    (match) => match.playerRoundWins < match.opponentRoundWins,
  );
  const drawsTwoWeeksAgo = matchesTwoWeeksAgo.filter(
    (match) => match.playerRoundWins === match.opponentRoundWins,
  );

  const response: WeeklyPerformanceResponse = {
    thisWeek: {
      games: matchesThisWeek.length,
      wins: winsThisWeek.length,
      losses: lossesThisWeek.length,
      draws: drawsThisWeek.length,
      characters: [], // TODO: implement this
    },
    lastWeek: {
      games: matchesThisWeek.length,
      wins: winsLastWeek.length,
      losses: lossesLastWeek.length,
      draws: drawsLastWeek.length,
      characters: [], // TODO: implement this
    },
    twoWeeksAgo: {
      games: matchesTwoWeeksAgo.length,
      wins: winsTwoWeeksAgo.length,
      losses: lossesTwoWeeksAgo.length,
      draws: drawsTwoWeeksAgo.length,
      characters: [], // TODO: implement this
    },
  };

  res.status(200).json(response);
}
