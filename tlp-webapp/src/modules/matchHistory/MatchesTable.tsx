import { Loader, Table } from '@mantine/core';

import Error from '@/components/common/Error';

import MatchesTableRow from './MatchesTableRow';
import useMatches from './useMatches';

export interface MatchesTableProps {
  character?: string;
}

export default function MatchesTable({ character }: MatchesTableProps) {
  const { data: matches, error, isLoading, isIdle, isError } = useMatches(character);

  if (isLoading || isIdle) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const rows = matches.map((match) => <MatchesTableRow key={match.id} match={match} />);

  return (
    <Table
      striped
      highlightOnHover
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
        'thead tr': {
          backgroundColor: 'rgb(251, 251, 251) !important',
        },
      }}
    >
      <thead>
        <tr>
          <th>Character</th>
          <th>Rank</th>
          <th>Opponent</th>
          <th>Opponent Character</th>
          <th>Outcome</th>
          <th>Stage</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
