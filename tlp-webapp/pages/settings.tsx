import type { NextPage } from 'next';
import Head from 'next/head';
import {
  AppShell,
  Navbar,
  Header,
  Title,
  Text,
  Anchor,
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Notification,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import Brand from '@/components/Brand';
import MainLinks from '@/components/MainLinks';
import { RecorderSettings, Settings } from './api/settings';
import axios, { AxiosError } from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { Check, X } from 'tabler-icons-react';
import { useState } from 'react';

interface SettingsFormProps {
  settings: Settings;
}

function SettingsForm({ settings }: SettingsFormProps) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<RecorderSettings>({
    initialValues: {
      enableDatabaseSync: settings.recorder.enableDatabaseSync,
      enableNotationSync: settings.recorder.enableNotationSync,
      enableVideoRecording: settings.recorder.enableVideoRecording,
      enableVideoUpload: settings.recorder.enableVideoUpload,
      enableCleanup: settings.recorder.enableCleanup,
      obsWebsocketPort: settings.recorder.obsWebsocketPort,
      obsWebsocketPassword: settings.recorder.obsWebsocketPassword,
      recordingPath: settings.recorder.recordingPath,
      matchesPerRecording: settings.recorder.matchesPerRecording,
      uploadDelay: settings.recorder.uploadDelay,
      cleanupDelay: settings.recorder.cleanupDelay,
      logLevel: settings.recorder.logLevel,
      tickInterval: settings.recorder.tickInterval,
    },
    validate: {
      logLevel: (value) =>
        value === 'info' || value === 'verbose' ? null : 'Log level must be "info" or "verbose"',
      obsWebsocketPort: (value) =>
        value >= 0 && value <= 65535 ? null : 'OBS Websocket port must be between 0 and 65535',
      obsWebsocketPassword: (value) =>
        value.length > 0 ? null : 'OBS Websocket password cannot be empty',
      matchesPerRecording: (value) =>
        value > 0 ? null : 'Matches per recording must be greater than 0',
      recordingPath: (value) =>
        !value.includes('\\') ? null : 'Use "/" instead of "\\" for the recording path',
    },
  });

  async function handleSubmit(values: RecorderSettings) {
    const newSettings: Settings = {
      recorder: {
        ...values,
      },
    };
    try {
      setLoading(true);
      const response = await axios.post('/api/settings', newSettings);
      if (response.status === 200) {
        setSuccess(true);
        queryClient.invalidateQueries('settings');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data ?? err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 640 }}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title order={4} mb={12}>
          Functionalities
        </Title>

        <Checkbox
          mt="md"
          label="Enable database sync"
          {...form.getInputProps('enableDatabaseSync', { type: 'checkbox' })}
        />

        <Checkbox
          mt="md"
          label="Enable notation sync"
          {...form.getInputProps('enableNotationSync', { type: 'checkbox' })}
        />

        <Checkbox
          mt="md"
          label="Enable video recording"
          {...form.getInputProps('enableVideoRecording', { type: 'checkbox' })}
        />

        <Checkbox
          mt="md"
          label="Enable video upload"
          {...form.getInputProps('enableVideoUpload', { type: 'checkbox' })}
        />

        <Checkbox
          mt="md"
          label="Enable cleanup"
          {...form.getInputProps('enableCleanup', { type: 'checkbox' })}
        />

        <Title order={4} mt={24} mb={12}>
          Preferences
        </Title>

        <TextInput
          required
          label="OBS Websocket Port"
          {...form.getInputProps('obsWebsocketPort')}
        />

        <TextInput
          required
          label="OBS Websocket Password"
          {...form.getInputProps('obsWebsocketPassword')}
        />

        <TextInput required label="Recording path" {...form.getInputProps('recordingPath')} />

        <TextInput
          required
          label="Matches per recording"
          {...form.getInputProps('matchesPerRecording')}
        />

        <TextInput required label="Upload delay" {...form.getInputProps('uploadDelay')} />

        <TextInput required label="Cleanup delay" {...form.getInputProps('cleanupDelay')} />

        <Title order={4} mt={24} mb={12}>
          Developer Settings
        </Title>

        <TextInput required label="Log level" {...form.getInputProps('logLevel')} />

        <TextInput required label="Tick interval" {...form.getInputProps('tickInterval')} />

        <Group position="right" mt="md">
          <Button disabled={loading} type="submit">
            Update Settings
          </Button>
        </Group>
      </form>

      {error && (
        <Notification
          icon={<X size={18} />}
          color="red"
          title="Something went wrong"
          onClose={() => setError(null)}
          mt={12}
        >
          {error}
        </Notification>
      )}

      {success && (
        <Notification
          icon={<Check size={18} />}
          color="teal"
          title="Configuration updated"
          onClose={() => setSuccess(false)}
          mt={12}
        >
          Please restart the recorder application to apply your settings.
        </Notification>
      )}
    </Box>
  );
}

async function fetchSettings() {
  const response = await axios.get('/api/settings');
  return response.data;
}

const Settings: NextPage = () => {
  const { data, status } = useQuery<Settings>('settings', fetchSettings);

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
              <Anchor target="_blank" href="https://steamcommunity.com/id/shishigami/">
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
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Head>
        <title>Tekken Learning Platform</title>
      </Head>

      <Title order={2} mb={24}>
        Settings
      </Title>

      {data && <SettingsForm settings={data} />}
    </AppShell>
  );
};

export default Settings;
