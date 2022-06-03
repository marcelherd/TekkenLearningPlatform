import { Anchor } from '@mantine/core';

import { Stage } from '@/lib/types';
import { getDateText, getWinrateText } from '@/lib/util';

export interface StagesTableRowProps {
  stage: Stage;
}

export default function StagesTableRow({ stage }: StagesTableRowProps) {
  const { name, games, wins, losses, draws, lastPlayed, lastPlayedId } = stage;

  const dateText = getDateText(lastPlayed);
  const winrate = getWinrateText(wins, losses);

  // TODO: Add onclick and stage detail page
  return (
    <tr>
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
