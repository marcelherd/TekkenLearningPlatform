import { useRouter } from 'next/router';

import { Title } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import { CharacterOverview, MatchupsTable, StagesTable } from '@/modules/dashboard';
import { MatchesTable } from '@/modules/matchHistory';
import PageTitle from '@/components/common/PageTitle';
import Breadcrumbs from '@/components/common/Breadcrumbs';

const CharacterDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const character = router.query.character as string;

  const pageTitle = character;
  const breadcrumbs = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: character, path: `/dashboard/${character}` },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageTitle>{pageTitle}</PageTitle>

      <CharacterOverview />

      <Title order={3} mb={12} mt={24}>
        Latest matches
      </Title>
      <MatchesTable character={character} />

      <Title order={3} mb={12} mt={24}>
        Matchups
      </Title>
      <MatchupsTable />

      <Title order={3} mb={12} mt={24}>
        Stages
      </Title>
      <StagesTable />
    </>
  );
};

export default CharacterDetail;
