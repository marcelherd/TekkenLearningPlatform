import { useRouter } from 'next/router';

import axios from 'axios';
import { useQuery } from 'react-query';
import { Match } from '@prisma/client';

async function findById(id: string | number) {
  const { data } = await axios.get<Match>(`/api/matches/${id}`);
  return data;
}

export default function useMatch(id?: string | number) {
  const router = useRouter();
  const matchId = id ?? (router.query.id as string); // FIXME: this is "undefined" on the first render
  return useQuery<Match, Error>(['match', id], () => findById(matchId));
}
