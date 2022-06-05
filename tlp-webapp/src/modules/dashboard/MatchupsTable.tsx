import { Loader, Table } from '@mantine/core';

import Error from '@/components/common/Error';
import { Matchup } from '@/lib/types';

import MatchupsTableRow from './MatchupsTableRow';
import useCharacterSummary from './useCharacterSummary';

export interface MatchupsTableProps {}

export default function MatchupsTable(props: MatchupsTableProps) {
  const { data: characterSummary, error, isLoading, isIdle, isError } = useCharacterSummary();

  if (isLoading || isIdle) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const { matchups } = characterSummary;
  const rows = matchups.map((matchup) => (
    <MatchupsTableRow key={matchup.character} matchup={matchup} />
  ));

  return (
    <Table
      striped
      highlightOnHover
      sx={{
        'thead tr': {
          backgroundColor: 'rgb(251, 251, 251) !important',
        },
      }}
    >
      <thead>
        <tr>
          <th>Character</th>
          <th>Games</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Draws</th>
          <th>Winrate</th>
          <th>Last played</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
