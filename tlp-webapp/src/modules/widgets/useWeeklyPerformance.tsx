import axios from 'axios';
import { useQuery } from 'react-query';

import { WeeklyPerformanceResponse } from '@/lib/types';

async function fetchData() {
  const { data } = await axios.get<any>('/api/matches/weeklyPerformance');
  return data;
}

export default function useWeeklyPerformance() {
  return useQuery<WeeklyPerformanceResponse, Error>(['weeklyPerformance'], fetchData);
}
