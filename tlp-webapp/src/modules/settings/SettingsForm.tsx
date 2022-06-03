import { Box, Title, Checkbox, TextInput, Group, Button, Notification } from '@mantine/core';

import { Settings } from '@/lib/types';
import useSettingsForm from './useSettingsForm';
import { X, Check } from 'tabler-icons-react';

export interface SettingsFormProps {
  settings: Settings;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  // TODO: Refactoring
  const { loading, success, setSuccess, error, setError, form, handleSubmit } =
    useSettingsForm(settings);

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
