import { Space, Text } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import { MatchesTable } from '@/modules/matchHistory';

const MatchHistory: NextPageWithLayout = () => {
  return (
    <>
      <Text>Showing your latest 10 matches. Click on a match to get more information.</Text>
      <Space h="md" />
      <MatchesTable />
    </>
  );
};

MatchHistory.pageTitle = 'Match History';

export default MatchHistory;
