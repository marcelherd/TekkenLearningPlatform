import { Loader, Text } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import Error from '@/components/common/Error';
import { MatchVideo, useMatch } from '@/modules/matchHistory';
import { getDateText } from '@/lib/util';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PageTitle from '@/components/common/PageTitle';
import Outcome from '@/components/common/Outcome';

const MatchHistoryDetail: NextPageWithLayout = () => {
  const { data: match, error, isLoading, isIdle, isError } = useMatch();

  if (isLoading || isIdle) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const { id, playerCharacter, opponent, opponentCharacter, stage, createdAt } = match;
  const dateText = getDateText(createdAt);
  const pageTitle = `${playerCharacter} (Me) vs ${opponentCharacter} (${opponent})`;
  const breadcrumbs = [
    { label: 'Match History', path: '/history' },
    { label: `Match ${id}`, path: `/history/${id}` },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageTitle>{pageTitle}</PageTitle>
      <Text>Played {dateText}</Text>
      <Text>
        Result: <Outcome match={match} detailed />
      </Text>
      <Text>Stage: {stage}</Text>
      <MatchVideo match={match} />
    </>
  );
};

export default MatchHistoryDetail;
