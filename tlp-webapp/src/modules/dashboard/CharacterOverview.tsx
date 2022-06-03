import { Box, Image, Text } from '@mantine/core';

import { Character } from '@/lib/types';
import { getWinrateText } from '@/lib/util';

export interface CharacterOverviewProps {
  character: Character;
}

export default function CharacterOverview({ character }: CharacterOverviewProps) {
  const { name, games, wins, losses, draws } = character;
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
