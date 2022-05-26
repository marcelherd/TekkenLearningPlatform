import type { NextPage } from 'next';
import Head from 'next/head';
import { AppShell, Navbar, Header, Title, Text } from '@mantine/core';

import Brand from '@/components/Brand';
import MainLinks from '@/components/MainLinks';

const Dashboard: NextPage = () => {
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

      <Text>Dashboard</Text>
    </AppShell>
  );
};

export default Dashboard;
