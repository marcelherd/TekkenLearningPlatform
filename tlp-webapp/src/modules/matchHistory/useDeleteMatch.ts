import { useRouter } from 'next/router';

import axios from 'axios';
import { useMutation } from 'react-query';

function deleteMatch(id: string | number) {
  return axios.delete(`/api/matches/${id}`);
}

export default function useDeleteMatch(id?: string | number) {
  const router = useRouter();
  const matchId = id ?? (router.query.id as string);
  return useMutation(() => deleteMatch(matchId));
}
