import { Box, Image, Loader, Text } from '@mantine/core';

import Error from '@/components/common/Error';
import { getWinrateText } from '@/lib/util';

import useCharacterSummary from './useCharacterSummary';

export interface CharacterOverviewProps {}

export default function CharacterOverview(props: CharacterOverviewProps) {
  const { data: characterSummary, error, isLoading, isIdle, isError } = useCharacterSummary();

  if (isLoading || isIdle) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const { name, games, wins, losses, draws } = characterSummary.character;
  const winrate = getWinrateText(wins, losses);

  return (
    <Box sx={{ display: 'flex', gap: 8 }}>
      <Image
        src={`/images/characters/${name}.png`}
        alt={`${name} icon`}
        height={200}
        fit="contain"
      />
      <Box>
        <Text>Games played: {games}</Text>
        <Text>Wins: {wins}</Text>
        <Text>Losses: {losses}</Text>
        <Text>Draws: {draws}</Text>
        <Text>Winrate: {winrate}</Text>
      </Box>
    </Box>
  );
}
