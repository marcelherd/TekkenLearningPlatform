import {
  ActionIcon,
  Box,
  Group,
  Header as MantineHeader,
  useMantineColorScheme,
} from '@mantine/core';
import { MoonStars, Sun } from 'tabler-icons-react';

import BrandLogo from '@/components/common/BrandLogo';

export default function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <MantineHeader height={100} p="xs">
      <Box
        sx={(theme) => ({
          paddingLeft: theme.spacing.xs,
          paddingRight: theme.spacing.xs,
          paddingBottom: theme.spacing.lg,
        })}
      >
        <Group position="apart">
          <BrandLogo />
          <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
            {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
          </ActionIcon>
        </Group>
      </Box>
    </MantineHeader>
  );
}
