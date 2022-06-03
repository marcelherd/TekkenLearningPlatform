import { Anchor, Box, Text } from '@mantine/core';
import { Match } from '@prisma/client';

import YoutubeEmbed from '@/components/common/YoutubeEmbed';

export interface MatchVideoProps {
  match: Match;
}

export default function MatchVideo({ match }: MatchVideoProps) {
  const { recorded, recordingUrl } = match;

  if (!recorded) {
    return <Text>Match was not recorded.</Text>;
  }

  if (!recordingUrl) {
    return <Text>Upload in progress, please check back later.</Text>;
  }

  return (
    <Box>
      <Anchor href={recordingUrl}>Open in YouTube</Anchor>
      <YoutubeEmbed href={recordingUrl} width={800} height={450} title="Match recording" />
    </Box>
  );
}
