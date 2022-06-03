import { useRouter } from 'next/router';

import { Anchor } from '@mantine/core';

import { Character } from '@/lib/types';
import { getDateText, getWinrateText } from '@/lib/util';

export interface CharactersTableRowProps {
  character: Character;
}

export default function CharactersTableRow({ character }: CharactersTableRowProps) {
  const router = useRouter();
  const { name, games, wins, losses, draws, lastPlayed, lastPlayedId } = character;

  const dateText = getDateText(lastPlayed);
  const winrate = getWinrateText(wins, losses);

  const handleSelectRow = ({ name }: Character) => {
    router.push(`/dashboard/${name}`);
  };

  return (
    <tr onClick={() => handleSelectRow(character)}>
      <td>{name}</td>
      <td>{games}</td>
      <td>{wins}</td>
      <td>{losses}</td>
      <td>{draws}</td>
      <td>{winrate}</td>
      <td>
        <Anchor href={`/history/${lastPlayedId}`}>{dateText}</Anchor>
      </td>
    </tr>
  );
}
