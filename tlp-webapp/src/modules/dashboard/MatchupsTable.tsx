import { Table } from '@mantine/core';

import { Matchup } from '@/lib/types';

import MatchupsTableRow from './MatchupsTableRow';

export interface MatchupsTableProps {
  matchups: Matchup[];
}

export default function MatchupsTable({ matchups }: MatchupsTableProps) {
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
