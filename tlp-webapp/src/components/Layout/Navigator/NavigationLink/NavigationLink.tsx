import { useRouter } from 'next/router';

import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';

export interface NavigationLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
}

export default function NavigationLink({ icon, color, label, path }: NavigationLinkProps) {
  const router = useRouter();

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
        fontWeight: router.pathname.startsWith(path) ? 'bold' : 'normal',
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
