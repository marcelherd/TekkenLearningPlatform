import { Loader } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import Error from '@/components/common/Error';
import { CharacterPerformance, useCharacterSummary } from '@/modules/dashboard';

const CharacterDetail: NextPageWithLayout = () => {
  const { data: characterSummary, error, isLoading, isError } = useCharacterSummary();

  if (isLoading) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return <>{characterSummary && <CharacterPerformance characterSummary={characterSummary} />}</>;
};

export default CharacterDetail;
