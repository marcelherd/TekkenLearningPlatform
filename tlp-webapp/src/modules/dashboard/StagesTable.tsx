import { Loader, Table } from '@mantine/core';

import Error from '@/components/common/Error';

import StagesTableRow from './StagesTableRow';
import useCharacterSummary from './useCharacterSummary';

export interface StagesTableProps {}

export default function StagesTable(props: StagesTableProps) {
  const { data: characterSummary, error, isLoading, isIdle, isError } = useCharacterSummary();

  if (isLoading || isIdle) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const { stages } = characterSummary;
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
