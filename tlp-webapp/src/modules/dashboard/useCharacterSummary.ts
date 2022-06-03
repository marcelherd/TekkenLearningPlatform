import { useRouter } from 'next/router';

import axios from 'axios';
import { useQuery } from 'react-query';

import { CharacterSummary } from '@/lib/types';

async function findByName(name: string) {
  const { data } = await axios.get<CharacterSummary>(`/api/characters/${name}`);
  return data;
}

export default function useCharacterSummary(characterName?: string) {
  const router = useRouter();
  const name = characterName ?? (router.query.character as string); // FIXME: this is "undefined" on the first render
  return useQuery<CharacterSummary, Error>(['character', name], () => findByName(name));
}
