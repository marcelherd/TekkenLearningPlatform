import { useRouter } from 'next/router';

import axios from 'axios';
import { useQuery } from 'react-query';

import { CharacterSummary } from '@/lib/types';

async function findByName(name: string) {
  const { data } = await axios.get<CharacterSummary>(`/api/characters/${name}`);
  return data;
}

// TODO: Split this up
export default function useCharacterSummary(characterName?: string) {
  const router = useRouter();
  const name = characterName ?? (router.query.character as string);
  return useQuery<CharacterSummary, Error>(['character', name], () => findByName(name));
}
