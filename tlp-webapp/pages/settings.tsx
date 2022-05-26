import type { NextPage } from 'next';
import Head from 'next/head';
import { AppShell, Navbar, Header, Title, Text, Anchor } from '@mantine/core';

import Brand from '@/components/Brand';
import MainLinks from '@/components/MainLinks';

const Settings: NextPage = () => {
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
        Settings
      </Title>
    </AppShell>
  );
};

export default Settings;
