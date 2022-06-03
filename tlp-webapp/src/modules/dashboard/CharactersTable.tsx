import { Table } from '@mantine/core';

import { Character } from '@/lib/types';

import CharactersTableRow from './CharactersTableRow';

export interface CharactersTableProps {
  characters: Character[];
}

export default function CharactersTable({ characters }: CharactersTableProps) {
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
