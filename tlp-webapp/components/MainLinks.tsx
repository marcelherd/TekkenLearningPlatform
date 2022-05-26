import React from 'react';
import { Home, Settings, History, Flame } from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { useRouter } from 'next/router';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

function MainLink({ icon, color, label, path }: MainLinkProps) {
  const router = useRouter();

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
        fontWeight: path === router.pathname ? 'bold' : 'normal',
      })}
      onClick={() => router.push(path)}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
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

export default function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
