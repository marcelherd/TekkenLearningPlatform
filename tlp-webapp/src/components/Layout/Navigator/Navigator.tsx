import { Navbar, Text, Anchor, Box } from '@mantine/core';
import { Home, History, Flame, Settings } from 'tabler-icons-react';

import NavigationLink, { NavigationLinkProps } from './NavigationLink';

const pages: NavigationLinkProps[] = [
  {
    icon: <Home size={16} />,
    color: 'teal',
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <History size={16} />,
    color: 'blue',
    label: 'Match History',
    path: '/history',
  },
  {
    icon: <Flame size={16} />,
    color: 'red',
    label: 'Rivals',
    path: '/rivals',
  },
  {
    icon: <Settings size={16} />,
    color: 'gray',
    label: 'Settings',
    path: '/settings',
  },
];

export default function Navigator() {
  const links = pages.map((props) => <NavigationLink {...props} key={props.label} />);

  return (
    <Navbar width={{ base: 250 }} p="xs">
      <Navbar.Section grow mt="md">
        <Box>{links}</Box>
      </Navbar.Section>
      <Navbar.Section sx={{ width: 230, position: 'fixed', bottom: 10 }}>
        <Text align="center">
          Made by{' '}
          <Anchor target="_blank" href="https://steamcommunity.com/id/shishigami/">
            Sταrs
          </Anchor>
        </Text>
      </Navbar.Section>
    </Navbar>
  );
}
