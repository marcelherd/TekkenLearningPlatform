import axios from 'axios';
import { useQuery } from 'react-query';

import { Rival } from '@/lib/types';

async function findAll() {
  const { data } = await axios.get<Rival[]>('/api/rivals');
  return data;
}

export default function useRivals() {
  return useQuery<Rival[], Error>('rivals', findAll);
}
