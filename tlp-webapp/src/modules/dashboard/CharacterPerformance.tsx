import { Title } from '@mantine/core';

import { CharacterSummary } from '@/lib/types';
import PageTitle from '@/components/common/PageTitle';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { MatchesTable } from '@/modules/matchHistory';

import CharacterOverview from './CharacterOverview';
import StagesTable from './StagesTable';
import MatchupsTable from './MatchupsTable';

export interface CharacterPerformanceProps {
  characterSummary: CharacterSummary;
}

export default function CharacterPerformance({ characterSummary }: CharacterPerformanceProps) {
  const { character, matchups, stages, latestMatches } = characterSummary;
  const pageTitle = character.name;
  const breadcrumbs = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: character.name, path: `/dashboard/${character.name}` },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageTitle>{pageTitle}</PageTitle>

      <CharacterOverview character={character} />

      <Title order={3} mb={12} mt={24}>
        Latest matches
      </Title>
      <MatchesTable matches={latestMatches} />

      <Title order={3} mb={12} mt={24}>
        Matchups
      </Title>
      <MatchupsTable matchups={matchups} />

      <Title order={3} mb={12} mt={24}>
        Stages
      </Title>
      <StagesTable stages={stages} />
    </>
  );
}
