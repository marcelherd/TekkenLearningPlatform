import { Match } from '@prisma/client';
import { useMantineTheme } from '@mantine/core';

export interface OutcomeProps {
  match: Match;
  colorize?: boolean;
  detailed?: boolean;
}

export default function Outcome({
  match,
  colorize = true,
  detailed = false,
}: OutcomeProps) {
  const theme = useMantineTheme();

  const wins = match.playerRoundWins;
  const losses = match.opponentRoundWins;

  let result: React.ReactNode;

  if (wins > losses) {
    result = (
      <span style={colorize ? { color: theme.colors.green[8] } : {}}>Win</span>
    );
  } else if (wins < losses) {
    result = (
      <span style={colorize ? { color: theme.colors.red[8] } : {}}>Loss</span>
    );
  } else {
    result = (
      <span style={colorize ? { color: theme.colors.yellow[8] } : {}}>
        Draw
      </span>
    );
  }

  // I know, please don't judge me
  return (
    <>
      {result}
      {detailed && (
        <>
          {'\u00A0'}
          <span>
            ({wins}-{losses})
          </span>
        </>
      )}
    </>
  );
}
