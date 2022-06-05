import { Loader, Table } from '@mantine/core';

import Error from '@/components/common/Error';

import RivalsTableRow from './RivalsTableRow';
import useRivals from './useRivals';

export interface RivalsTableProps {}

export default function RivalsTable(props: RivalsTableProps) {
  const { data: rivals, error, isLoading, isIdle, isError } = useRivals();

  if (isLoading || isIdle) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

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
