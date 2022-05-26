import type { NextPage } from 'next';
import Head from 'next/head';
import {
  AppShell,
  Navbar,
  Header,
  Breadcrumbs,
  Anchor,
  Text,
  useMantineTheme,
  Title,
  Box,
} from '@mantine/core';
import axios from 'axios';

import Brand from '@/components/Brand';
import MainLinks from '@/components/MainLinks';
import { Match } from '@prisma/client';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { formatRelative } from 'date-fns';
import Outcome from '@/components/Outcome';

async function fetchMatchDetail(id: string) {
  console.log('id', id);
  const response = await axios.get(`/api/matches/${id}`);
  return response.data;
}

function YoutubeEmbed({ href }: { href: string }) {
  const [baseUrl, videoId] = href.split('?v=');
  return (
    <div>
      <iframe
        width={560}
        height={315}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Match recording"
      />
    </div>
  );
}

function RecordingEmbed({ match }: { match: Match }) {
  if (match.recorded && match.recordingUrl) {
    return (
      <Box mt={24}>
        <Anchor href={match.recordingUrl}>Open in YouTube</Anchor>
        <YoutubeEmbed href={match.recordingUrl} />
      </Box>
    );
  } else if (match.recorded) {
    return <span>Upload in progress, please check back later.</span>;
  }

  return <span>Match was not recorded.</span>;
}

const HistoryDetail: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, status } = useQuery<Match>(['matchDetail', id], () =>
    fetchMatchDetail(id)
  );

  if (!data) {
    return <span>Loading...</span>;
  }

  const {
    playerCharacter,
    playerRank,
    playerRoundWins,
    opponent,
    opponentCharacter,
    opponentRoundWins,
    roundWinsRequired,
    stage,
    recorded,
    recordingUrl,
    createdAt,
    updatedAt,
  } = data;

  const pageTitle = `${playerCharacter} (Me) vs ${opponentCharacter} (${opponent})`;

  const breadcrumbItems = [
    { title: 'Match History', href: '/history' },
    { title: `Match ${id}`, href: `/history/${id}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} p="xs">
          <Navbar.Section grow mt="md">
            <MainLinks />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={100} p="xs">
          <Brand />
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Head>
        <title>Tekken Learning Platform</title>
      </Head>

      <Breadcrumbs mb={12}>{breadcrumbItems}</Breadcrumbs>

      <Title order={2} mb={12}>
        {pageTitle}
      </Title>
      <Text>Played {formatRelative(new Date(createdAt), new Date())}</Text>
      <Text>
        Result: <Outcome match={data} detailed={true} />
      </Text>
      <Text>Stage: {stage}</Text>
      <RecordingEmbed match={data} />
    </AppShell>
  );
};

export default HistoryDetail;
