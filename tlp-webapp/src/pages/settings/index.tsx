import { Loader, Space, Text } from '@mantine/core';

import { NextPageWithLayout } from '@/lib/types';
import Error from '@/components/common/Error';
import SettingsForm, { useSettings } from '@/modules/settings';

const Settings: NextPageWithLayout = () => {
  const { data: settings, error, isLoading, isIdle, isError } = useSettings();

  if (isLoading || isIdle) {
    return <Loader variant="dots" />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <Text>Showing your top 10 most played opponents.</Text>
      <Space h="md" />
      <SettingsForm settings={settings} />
    </>
  );
};

Settings.pageTitle = 'Settings';

export default Settings;
