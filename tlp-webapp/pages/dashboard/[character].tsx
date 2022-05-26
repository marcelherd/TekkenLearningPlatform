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
  Breadcrumbs,
} from '@mantine/core';

import Brand from '@/components/Brand';
import MainLinks from '@/components/MainLinks';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Character } from '@/pages/api/overview/[character]';
import { formatRelative } from 'date-fns';
import { Match } from '@prisma/client';
import Outcome from '@/components/Outcome';

async function fetchCharacterDetail(characterName: string) {
  const response = await axios.get(`/api/overview/${characterName}`);
  return response.data;
}

const CharacterDetail: NextPage = () => {
  const router = useRouter();
  const character = router.query.character as string;
  const { data, status } = useQuery<Character>(
    ['characterDetail', character],
    () => fetchCharacterDetail(character)
  );

  if (!data) {
    return <span>Loading...</span>;
  }

  const handleSelectMatch = (match: Match) => {
    router.push(`/history/${match.id}`);
  };

  const matches = data?.latestMatches.map((match) => {
    const date = new Date(match.createdAt);

    return (
      <tr key={match.id} onClick={() => handleSelectMatch(match)}>
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

  const matchups = data?.matchups.map((matchup) => {
    const date = new Date(matchup.lastPlayed);
    const dateText = formatRelative(date, new Date());
    const winrate = (matchup.wins / (matchup.games - matchup.draws)) * 100;

    return (
      <tr key={matchup.character}>
        <td>{matchup.character}</td>
        <td>{matchup.games}</td>
        <td>{matchup.wins}</td>
        <td>{matchup.losses}</td>
        <td>{matchup.draws}</td>
        <td>{winrate.toFixed(2)}%</td>
        <td>
          <Anchor href={`/history/${matchup.lastPlayedId}`}>{dateText}</Anchor>
        </td>
      </tr>
    );
  });

  const stages = data?.stages.map((stage) => {
    const date = new Date(stage.lastPlayed);
    const dateText = formatRelative(date, new Date());
    const winrate = (stage.wins / (stage.games - stage.draws)) * 100;

    return (
      <tr key={stage.name}>
        <td>{stage.name}</td>
        <td>{stage.games}</td>
        <td>{stage.wins}</td>
        <td>{stage.losses}</td>
        <td>{stage.draws}</td>
        <td>{winrate.toFixed(2)}%</td>
        <td>
          <Anchor href={`/history/${stage.lastPlayedId}`}>{dateText}</Anchor>
        </td>
      </tr>
    );
  });

  const winrate = (data?.wins / (data?.games - data?.draws)) * 100;
  const dateText = formatRelative(new Date(data?.lastPlayed), new Date());

  const breadcrumbItems = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: character, href: `/dashboard/${character}` },
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

      <Breadcrumbs mb={12}>{breadcrumbItems}</Breadcrumbs>

      <Title order={2} mb={12}>
        {character}
      </Title>
      <Text>Games played: {data?.games}</Text>
      <Text>Wins: {data?.wins}</Text>
      <Text>Losses: {data?.losses}</Text>
      <Text>Draws: {data?.draws}</Text>
      <Text>Winrate: {`${winrate.toFixed(2)}%`}</Text>
      <Text>
        Last played:{' '}
        <Anchor href={`/history/${data?.lastPlayedId}`}>{dateText}</Anchor>
      </Text>

      <Title order={3} mb={12} mt={24}>
        Latest matches
      </Title>
      {matches && (
        <Table
          striped
          highlightOnHover
          sx={(theme) => ({
            '&:hover': {
              cursor: 'pointer',
            },
          })}
          mt={12}
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
          <tbody>{matches}</tbody>
        </Table>
      )}

      <Title order={3} mb={12} mt={24}>
        Matchups
      </Title>
      {matchups && (
        <Table striped highlightOnHover mt={12}>
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
          <tbody>{matchups}</tbody>
        </Table>
      )}

      <Title order={3} mb={12} mt={24}>
        Stages
      </Title>
      {stages && (
        <Table striped highlightOnHover mt={12}>
          <thead>
            <tr>
              <th>Stage</th>
              <th>Games</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Draws</th>
              <th>Winrate</th>
              <th>Last played</th>
            </tr>
          </thead>
          <tbody>{stages}</tbody>
        </Table>
      )}
    </AppShell>
  );
};

export default CharacterDetail;
