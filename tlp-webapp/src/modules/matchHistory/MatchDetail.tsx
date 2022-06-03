import { Text } from '@mantine/core';
import { Match } from '@prisma/client';

import { getDateText } from '@/lib/util';
import PageTitle from '@/components/common/PageTitle';
import Outcome from '@/components/common/Outcome';
import Breadcrumbs from '@/components/common/Breadcrumbs';

import MatchVideo from './MatchVideo';

export interface MatchDetailProps {
  match: Match;
}

export default function MatchDetail({ match }: MatchDetailProps) {
  const { id, playerCharacter, opponent, opponentCharacter, stage, createdAt } = match;
  const dateText = getDateText(createdAt);
  const pageTitle = `${playerCharacter} (Me) vs ${opponentCharacter} (${opponent})`;
  const breadcrumbs = [
    { label: 'Match History', path: '/history' },
    { label: `Match ${id}`, path: `/history/${id}` },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageTitle>{pageTitle}</PageTitle>
      <Text>Played {dateText}</Text>
      <Text>
        Result: <Outcome match={match} detailed />
      </Text>
      <Text>Stage: {stage}</Text>
      <MatchVideo match={match} />
    </>
  );
}
