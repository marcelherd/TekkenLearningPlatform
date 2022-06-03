import { Anchor } from '@mantine/core';

import { Rival } from '@/lib/types';
import { getDateText, getWinrateText } from '@/lib/util';

export interface RivalsTableRowProps {
  rival: Rival;
}

export default function RivalsTableRow({ rival }: RivalsTableRowProps) {
  const { name, wins, losses, draws, lastPlayed, lastPlayedId } = rival;
  const totalGames = wins + losses + draws;
  const winrate = getWinrateText(wins, losses);
  const dateText = getDateText(lastPlayed);

  // TODO: Add onclick and rival detail page
  return (
    <tr>
      <td>{name}</td>
      <td>{totalGames}</td>
      <td>{wins}</td>
      <td>{losses}</td>
      <td>{draws}</td>
      <td>{winrate}%</td>
      <td>
        <Anchor href={`/history/${lastPlayedId}`}>{dateText}</Anchor>
      </td>
    </tr>
  );
}
