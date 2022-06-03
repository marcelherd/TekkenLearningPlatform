import { Table } from '@mantine/core';

import { Stage } from '@/lib/types';

import StagesTableRow from './StagesTableRow';

export interface StagesTableProps {
  stages: Stage[];
}

export default function StagesTable({ stages }: StagesTableProps) {
  const rows = stages.map((stage) => <StagesTableRow key={stage.name} stage={stage} />);

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
          <th>Stage</th>
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
