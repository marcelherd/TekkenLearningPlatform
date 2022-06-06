import { useRouter } from 'next/router';

import { Loader, Space, Text } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import Error from '@/components/common/Error';
import { MatchVideo, useMatch, useDeleteMatch } from '@/modules/matchHistory';
import { getDateText } from '@/lib/util';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PageTitle from '@/components/common/PageTitle';
import Outcome from '@/components/common/Outcome';
import DeleteButtonWithConfirmation from '@/components/common/DeleteButtonWithConfirmation';

const MatchHistoryDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: match, error, isLoading, isIdle, isError } = useMatch();
  const { mutateAsync: deleteMatch, error: deleteError } = useDeleteMatch();

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

  const handleDelete = async () => {
    try {
      await deleteMatch();
      if (!deleteError) {
        router.back();
      } else {
        console.error('Could not delete match', deleteError);
      }
    } catch (err) {
      console.error('Could not delete match', err, deleteError);
    }
  };

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
      <Space h="md" />
      <DeleteButtonWithConfirmation label="Flag false positive" callback={handleDelete} />
    </>
  );
};

export default MatchHistoryDetail;
