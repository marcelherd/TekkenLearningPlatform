import { Loader } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import Error from '@/components/common/Error';
import { MatchDetail, useMatch } from '@/modules/matchHistory';

const MatchHistoryDetail: NextPageWithLayout = () => {
  const { data: match, error, isLoading, isError } = useMatch();

  if (isLoading) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return <>{match && <MatchDetail match={match} />}</>;
};

export default MatchHistoryDetail;
