import type { NextPage } from 'next';
import Head from 'next/head';
import {
  AppShell,
  Navbar,
  Header,
  Title,
  Text,
  Table,
  Anchor,
} from '@mantine/core';

import Brand from '@/components/Brand';
import MainLinks from '@/components/MainLinks';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { CharacterSummary } from '@/pages/api/overview';
import { formatRelative } from 'date-fns';

async function fetchOverview() {
  const response = await axios.get('/api/overview');
  return response.data;
}

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { data, status } = useQuery<CharacterSummary[]>(
    'overview',
    fetchOverview
  );

  const handleSelectRow = ({ name }: CharacterSummary) => {
    router.push(`/dashboard/${name}`);
  };

  const rows = data?.map((character) => {
    const date = new Date(character.lastPlayed);
    const dateText = formatRelative(date, new Date());
    const winrate =
      (character.wins / (character.games - character.draws)) * 100;

    return (
      <tr key={character.name} onClick={() => handleSelectRow(character)}>
        <td>{character.name}</td>
        <td>{character.games}</td>
        <td>{character.wins}</td>
        <td>{character.losses}</td>
        <td>{character.draws}</td>
        <td>{winrate.toFixed(2)}%</td>
        <td>
          <Anchor href={`/history/${character.lastPlayedId}`}>
            {dateText}
          </Anchor>
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
        Dashboard
      </Title>
      <Text mb={24}>Showing your played characters.</Text>

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
              <th>Games</th>
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

export default Dashboard;
