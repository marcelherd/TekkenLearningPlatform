import axios from 'axios';
import { useQuery } from 'react-query';
import { Match } from '@prisma/client';

async function findAll() {
  const { data } = await axios.get<Match[]>('/api/matches?limit=10');
  return data;
}

export default function useMatches() {
  return useQuery<Match[], Error>('matches', findAll);
}
