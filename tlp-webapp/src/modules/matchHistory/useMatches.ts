import axios from 'axios';
import { useQuery } from 'react-query';
import { Match } from '@prisma/client';

import { CharacterSummary } from '@/lib/types';

async function findAll() {
  const { data } = await axios.get<Match[]>('/api/matches?limit=10');
  return data;
}

async function findByCharacter(character: string) {
  const { data } = await axios.get<CharacterSummary>(`/api/characters/${character}`);
  return data.latestMatches;
}

export default function useMatches(character?: string) {
  return useQuery<Match[], Error>(['matches', character], () => {
    if (character) {
      return findByCharacter(character);
    }
    return findAll();
  });
}
