import { Table } from '@mantine/core';

import { Rival } from '@/lib/types';

import RivalsTableRow from './RivalsTableRow';

export interface RivalsTableProps {
  rivals: Rival[];
}

export default function RivalsTable({ rivals }: RivalsTableProps) {
  const rows = rivals.map((rival) => <RivalsTableRow key={rival.name} rival={rival} />);

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
          <th>Name</th>
          <th>Total games</th>
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
