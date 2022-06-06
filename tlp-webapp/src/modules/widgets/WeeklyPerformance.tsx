import { Box, Loader } from '@mantine/core';

import Error from '@/components/common/Error';

import useWeeklyPerformance from './useWeeklyPerformance';
import WeeklyWinrate from './WeeklyWinrate';
import { getWinrateText } from '@/lib/util';

export interface WeeklyPerformanceProps {}

export default function WeeklyPerformance(props: WeeklyPerformanceProps) {
  const { data, error, isLoading, isIdle, isError } = useWeeklyPerformance();

  if (isLoading || isIdle) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  const winrateThisWeek = getWinrateText(data.thisWeek.wins, data.thisWeek.losses, 0);
  const winrateLastWeek = getWinrateText(data.lastWeek.wins, data.lastWeek.losses, 0);
  const winrateTwoWeeksAgo = getWinrateText(data.twoWeeksAgo.wins, data.twoWeeksAgo.losses, 0);

  const variantThisWeek =
    winrateThisWeek > winrateLastWeek
      ? 'better'
      : winrateThisWeek < winrateLastWeek
      ? 'worse'
      : 'equal';

  const variantLastWeek =
    winrateLastWeek > winrateTwoWeeksAgo
      ? 'better'
      : winrateLastWeek < winrateTwoWeeksAgo
      ? 'worse'
      : 'equal';

  return (
    <Box sx={{ display: 'flex', gap: 16 }}>
      <WeeklyWinrate
        label="Winrate this week"
        winrate={winrateThisWeek}
        variant={variantThisWeek}
      />
      <WeeklyWinrate
        label="Winrate last week"
        winrate={winrateLastWeek}
        variant={variantLastWeek}
      />
    </Box>
  );
}
