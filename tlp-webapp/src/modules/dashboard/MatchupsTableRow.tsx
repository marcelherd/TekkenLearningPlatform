import { Anchor } from '@mantine/core';

import { Matchup } from '@/lib/types';
import { getDateText, getWinrateText } from '@/lib/util';

export interface MatchupsTableRowProps {
  matchup: Matchup;
}

export default function MatchupsTableRow({ matchup }: MatchupsTableRowProps) {
  const { character, games, wins, losses, draws, lastPlayed, lastPlayedId } = matchup;

  const dateText = getDateText(lastPlayed);
  const winrate = getWinrateText(wins, losses);

  // TODO: Add onclick and matchup detail page
  return (
    <tr>
      <td>{character}</td>
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
