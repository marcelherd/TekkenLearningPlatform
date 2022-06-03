import { Table } from '@mantine/core';
import { Match } from '@prisma/client';

import MatchesTableRow from './MatchesTableRow';

export interface MatchesTableProps {
  matches: Match[];
}

export default function MatchesTable({ matches }: MatchesTableProps) {
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
