import axios from 'axios';
import { useQuery } from 'react-query';

import { Character } from '@/lib/types';

async function findAll() {
  const { data } = await axios.get<Character[]>('/api/characters');
  return data;
}

export default function useCharacters() {
  return useQuery<Character[], Error>('characters', findAll);
}
