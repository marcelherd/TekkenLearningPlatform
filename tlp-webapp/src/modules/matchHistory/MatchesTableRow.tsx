import { useRouter } from 'next/router';

import { Anchor } from '@mantine/core';
import { Match } from '@prisma/client';

import { getDateText } from '@/lib/util';
import Outcome from '@/components/common/Outcome';

export interface MatchesTableRowProps {
  match: Match;
}

export default function MatchesTableRow({ match }: MatchesTableRowProps) {
  const router = useRouter();

  const { playerCharacter, playerRank, opponent, opponentCharacter, stage, createdAt } = match;
  const dateText = getDateText(createdAt);

  const handleSelectRow = ({ id }: Match) => {
    router.push(`/history/${id}`);
  };

  return (
    <tr onClick={() => handleSelectRow(match)}>
      <td>{playerCharacter}</td>
      <td>{playerRank}</td>
      <td>{opponent}</td>
      <td>{opponentCharacter}</td>
      <td>
        <Outcome match={match} />
      </td>
      <td>{stage}</td>
      <td>{dateText}</td>
    </tr>
  );
}
