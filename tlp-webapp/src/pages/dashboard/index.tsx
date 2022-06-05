import { Space, Text } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import { CharactersTable } from '@/modules/dashboard';

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <Text>Showing your played characters.</Text>
      <Space h="md" />
      <CharactersTable />
    </>
  );
};

Dashboard.pageTitle = 'Dashboard';

export default Dashboard;
