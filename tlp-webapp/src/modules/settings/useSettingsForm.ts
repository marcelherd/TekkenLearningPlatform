import { useState } from 'react';
import { useQueryClient } from 'react-query';

import axios, { AxiosError } from 'axios';
import { useForm } from '@mantine/form';

import { RecorderSettings, Settings } from '@/lib/types';

// TODO: Refactoring
export default function useSettingsForm({ recorder }: Settings) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<RecorderSettings>({
    initialValues: {
      enableDatabaseSync: recorder.enableDatabaseSync,
      enableNotationSync: recorder.enableNotationSync,
      enableVideoRecording: recorder.enableVideoRecording,
      enableVideoUpload: recorder.enableVideoUpload,
      enableCleanup: recorder.enableCleanup,
      obsWebsocketPort: recorder.obsWebsocketPort,
      obsWebsocketPassword: recorder.obsWebsocketPassword,
      recordingPath: recorder.recordingPath,
      matchesPerRecording: recorder.matchesPerRecording,
      uploadDelay: recorder.uploadDelay,
      cleanupDelay: recorder.cleanupDelay,
      logLevel: recorder.logLevel,
      tickInterval: recorder.tickInterval,
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

  return {
    loading,
    error,
    setError,
    success,
    setSuccess,
    form,
    handleSubmit,
  };
}
