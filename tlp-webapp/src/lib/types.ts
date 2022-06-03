import { NextComponentType, NextPage, NextPageContext } from 'next';

import { Match } from '@prisma/client';

// https://stackoverflow.com/a/69968164/4409162
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  pageTitle?: string;
  breadCrumbs?: Breadcrumb[];
};

export type NextComponentWithLayout = NextComponentType<NextPageContext, any, {}> &
  Partial<NextPageWithLayout>;

export interface Breadcrumb {
  label: string;
  path: string;
}

export interface Rival {
  name: string;
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: Date;
  lastPlayedId: number;
}

export interface Matchup {
  character: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: Date;
  lastPlayedId: number;
}

export interface Stage {
  name: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: Date;
  lastPlayedId: number;
}

export interface Character {
  name: string;
  games: number;
  wins: number;
  losses: number;
  draws: number;
  lastPlayed: Date;
  lastPlayedId: number;
}

export interface CharacterSummary {
  character: Character;
  latestMatches: Match[];
  matchups: Matchup[];
  stages: Stage[];
}

// TODO: Maybe I want to show in the future if a setting is being overriden
// by the corresponding environment variable
export interface Settings {
  recorder: RecorderSettings;
  overrides?: {
    recorder?: Partial<RecorderSettings>;
  };
}

export interface RecorderSettings {
  enableDatabaseSync: boolean;
  enableNotationSync: boolean;
  enableVideoRecording: boolean;
  enableVideoUpload: boolean;
  enableCleanup: boolean;
  obsWebsocketPort: number;
  obsWebsocketPassword: string;
  recordingPath: string;
  matchesPerRecording: number;
  uploadDelay: number;
  cleanupDelay: number;
  logLevel: 'verbose' | 'info';
  tickInterval: number;
}
