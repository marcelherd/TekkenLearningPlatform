import { Loader, Table } from '@mantine/core';

import Error from '@/components/common/Error';

import CharactersTableRow from './CharactersTableRow';
import useCharacters from './useCharacters';

export interface CharactersTableProps {}

export default function CharactersTable(props: CharactersTableProps) {
  const { data: characters, error, isLoading, isIdle, isError } = useCharacters();

  if (isLoading || isIdle) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const rows = characters.map((character) => (
    <CharactersTableRow key={character.name} character={character} />
  ));

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
