import { useRouter } from 'next/router';

import axios from 'axios';
import { useQuery } from 'react-query';

import { Rival } from '@/lib/types';

async function findById(id: string | number) {
  const { data } = await axios.get<Rival>(`/api/rivals/${id}`);
  return data;
}

export default function useRival(id?: string | number) {
  const router = useRouter();
  const rivalId = id ?? (router.query.id as string); // FIXME: this is "undefined" on the first render
  return useQuery<Rival, Error>(['rival', id], () => findById(rivalId));
}
