import axios from 'axios';
import { useQuery } from 'react-query';

import { Settings } from '@/lib/types';

async function fetchSettings() {
  const { data } = await axios.get<Settings>('/api/settings');
  return data;
}

export default function useSettings() {
  return useQuery<Settings, Error>('settings', fetchSettings);
}
