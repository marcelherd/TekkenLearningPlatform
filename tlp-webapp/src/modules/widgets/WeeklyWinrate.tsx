import { Box, Card, MantineColor, Text, ThemeIcon } from '@mantine/core';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'tabler-icons-react';

export type WeeklyWinrateVariants = 'better' | 'worse' | 'equal';

export interface WeeklyWinrateProps {
  label: string;
  winrate: string;
  variant: WeeklyWinrateVariants;
}

const colorMap: Record<WeeklyWinrateVariants, MantineColor> = {
  better: 'green',
  worse: 'red',
  equal: 'yellow',
};

const iconMap: Record<WeeklyWinrateVariants, React.ReactNode> = {
  better: <ArrowUpRight size={48} />,
  worse: <ArrowDownRight size={48} />,
  equal: <ArrowRight size={48} />,
};

export default function WeeklyWinrate({ label, winrate, variant }: WeeklyWinrateProps) {
  const color = colorMap[variant];
  const icon = iconMap[variant];

  return (
    <Card
      shadow="m"
      p="xl"
      sx={{ width: 'max-content', display: 'flex', flexDirection: 'row', gap: 24 }}
    >
      <Box>
        <Text weight={500} align="center" sx={{ fontSize: '2em' }}>
          {winrate}
        </Text>
        <Text size="sm" color="gray">
          {label}
        </Text>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ThemeIcon size={64} variant="light" color={color}>
          {icon}
        </ThemeIcon>
      </Box>
    </Card>
  );
}
