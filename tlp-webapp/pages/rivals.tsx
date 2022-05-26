import type { NextPage } from 'next';
import Head from 'next/head';
import {
  AppShell,
  Navbar,
  Header,
  Title,
  Table,
  Text,
  Anchor,
} from '@mantine/core';

import Brand from '@/components/Brand';
import MainLinks from '@/components/MainLinks';
import { Rival } from '@/pages/api/rivals';
import { useQuery } from 'react-query';
import axios from 'axios';
import { formatRelative } from 'date-fns';

async function fetchRivals() {
  const response = await axios.get('/api/rivals');
  return response.data;
}

const Rivals: NextPage = () => {
  const { data, status } = useQuery<Rival[]>('rivals', fetchRivals);

  if (!data) {
    return <span>Loading...</span>;
  }

  const rows = data?.map((rival) => {
    const totalGames = rival.wins + rival.losses;
    const winrate = (rival.wins / (totalGames - rival.draws)) * 100;
    const dateText = formatRelative(new Date(rival.lastPlayed), new Date());

    return (
      <tr key={rival.name}>
        <td>{rival.name}</td>
        <td>{totalGames}</td>
        <td>{rival.wins}</td>
        <td>{rival.losses}</td>
        <td>{rival.draws}</td>
        <td>{winrate.toFixed(2)}%</td>
        <td>
          <Anchor href={`/history/${rival.lastPlayedId}`}>{dateText}</Anchor>
        </td>
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
        Rivals
      </Title>
      <Text mb={24}>Showing your top 10 most played opponents.</Text>

      {rows && (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total games</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Draws</th>
              <th>Winrate</th>
              <th>Last played</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
    </AppShell>
  );
};

export default Rivals;
