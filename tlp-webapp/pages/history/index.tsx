import type { NextPage } from 'next';
import Head from 'next/head';
import {
  AppShell,
  Navbar,
  Header,
  Table,
  Text,
  Title,
  Anchor,
} from '@mantine/core';
import axios from 'axios';

import Brand from '@/components/Brand';
import MainLinks from '@/components/MainLinks';
import { Match } from '@prisma/client';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { formatRelative } from 'date-fns';
import Outcome from '@/components/Outcome';

async function fetchHistory() {
  const response = await axios.get('/api/matches?limit=10');
  return response.data;
}

const History: NextPage = () => {
  const router = useRouter();
  const { data, status } = useQuery<Match[]>('history', fetchHistory);

  if (!data) {
    return <span>Loading...</span>;
  }

  const handleSelectRow = (match: Match) => {
    router.push(`/history/${match.id}`);
  };

  const rows = data?.map((match) => {
    const date = new Date(match.createdAt);

    return (
      <tr key={match.id} onClick={() => handleSelectRow(match)}>
        <td>{match.playerCharacter}</td>
        <td>{match.playerRank}</td>
        <td>{match.opponent}</td>
        <td>{match.opponentCharacter}</td>
        <td>
          <Outcome match={match} />
        </td>
        <td>{match.stage}</td>
        <td>{formatRelative(date, new Date())}</td>
      </tr>
    );
  });

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} p="xs">
          <Navbar.Section grow mt="md">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section mt="md">
            <Text align="center">
              Made by{' '}
              <Anchor
                target="_blank"
                href="https://steamcommunity.com/id/shishigami/"
              >
                Sταrs
              </Anchor>
            </Text>
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

      <Title order={2} mb={12}>
        Match History
      </Title>
      <Text mb={24}>
        Showing your latest 10 matches. Click on a match to get more
        information.
      </Text>

      {rows && (
        <Table
          striped
          highlightOnHover
          sx={(theme) => ({
            '&:hover': {
              cursor: 'pointer',
            },
          })}
        >
          <thead>
            <tr>
              <th>Character</th>
              <th>Rank</th>
              <th>Opponent</th>
              <th>Opponent Character</th>
              <th>Outcome</th>
              <th>Stage</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
    </AppShell>
  );
};

export default History;
