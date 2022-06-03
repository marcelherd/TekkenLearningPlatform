import { Loader, Space, Text } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import Error from '@/components/common/Error';
import { MatchesTable, useMatches } from '@/modules/matchHistory';

const MatchHistory: NextPageWithLayout = () => {
  const { data: matches, error, isLoading, isError } = useMatches();

  if (isLoading) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <Text>Showing your top 10 most played opponents.</Text>
      <Space h="md" />
      {matches && <MatchesTable matches={matches} />}
    </>
  );
};

MatchHistory.pageTitle = 'Match History';

export default MatchHistory;
