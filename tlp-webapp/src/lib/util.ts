import { formatRelative } from 'date-fns';

export function isDevl() {
  return process.env.NODE_ENV === 'development';
}

export function isProd() {
  return process.env.NODE_ENV === 'production';
}

export function isNumeric(str: string) {
  return !Number.isNaN(parseFloat(str)) && isFinite(Number(str));
}

export function getWinrateText(wins: number, losses: number, precision: number = 2) {
  const games = wins + losses;
  const winrate = (wins / games) * 100;
  return `${winrate.toFixed(precision)}%`;
}

export function getDateText(date: string | Date) {
  if (typeof date === 'string') {
    return formatRelative(new Date(date), new Date());
  }
  return formatRelative(date, new Date());
}
