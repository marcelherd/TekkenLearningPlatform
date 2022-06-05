import { Space, Text } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import { RivalsTable } from '@/modules/rivals';

const Rivals: NextPageWithLayout = () => {
  return (
    <>
      <Text>Showing your top 10 most played opponents.</Text>
      <Space h="md" />
      <RivalsTable />
    </>
  );
};

Rivals.pageTitle = 'Rivals';

export default Rivals;
