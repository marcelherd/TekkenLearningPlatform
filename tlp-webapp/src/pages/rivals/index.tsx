import { Loader, Space, Text } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import Error from '@/components/common/Error';
import { RivalsTable, useRivals } from '@/modules/rivals';

const Rivals: NextPageWithLayout = () => {
  const { data: rivals, error, isLoading, isError } = useRivals();

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
      {rivals && <RivalsTable rivals={rivals} />}
    </>
  );
};

Rivals.pageTitle = 'Rivals';

export default Rivals;
