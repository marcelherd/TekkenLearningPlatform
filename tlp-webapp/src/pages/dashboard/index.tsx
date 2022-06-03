import { Loader, Space, Text } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import Error from '@/components/common/Error';
import { CharactersTable, useCharacters } from '@/modules/dashboard';

const Dashboard: NextPageWithLayout = () => {
  const { data: characters, error, isLoading, isError } = useCharacters();

  if (isLoading) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <Text>Showing your played characters.</Text>
      <Space h="md" />
      {characters && <CharactersTable characters={characters} />}
    </>
  );
};

Dashboard.pageTitle = 'Dashboard';

export default Dashboard;
