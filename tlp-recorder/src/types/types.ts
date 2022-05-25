export interface VideoOptions {
  title: string;
  description?: string;
  tags?: string[];
  categoryId?: string;
  privacyStatus?: 'public' | 'unlisted' | 'private';
}

export interface PlayerOffsets {
  charId: string;
  moveId: string;
  attackInput: string;
  directionInput: string;
  roundWins: string;
  rank: string;
}

export interface InputData {
  direction: string;
  attack: string;
  move: number;
}

export enum MatchResult {
  LOSS = 'Loss',
  WIN = 'Win',
  DRAW = 'Draw',
  UNRESOLVED = 'Unresolved',
}

export interface MatchScore {
  playerWins: number;
  opponentWins: number;
  roundWinsRequired: number;
  outcome: MatchResult;
}

export interface PlayerData {
  character: string;
  rank: string;
}

export interface OpponentData {
  character: string;
  name: string;
  rank: string;
}

export interface MatchData {
  player: PlayerData;
  opponent: OpponentData;
  stage: string;
}

export interface MatchStartEventData {
  match: MatchData;
}

export interface MatchEndEventData {
  match: MatchData;
  score: MatchScore;
}

export interface MatchUnresolvedEventData {}

export interface TickEventData {
  playerInput: InputData;
  opponentInput: InputData;
}

export enum TekkenEvent {
  MATCH_START = 'MatchStart',
  MATCH_END = 'MatchEnd',
  MATCH_UNRESOLVED = 'MatchUnresolved',
  TICK = 'Tick',
}

export interface TekkenEvents {
  MatchStart: (data: MatchStartEventData) => void;
  MatchEnd: (data: MatchEndEventData) => void;
  MatchUnresolved: (data: MatchUnresolvedEventData) => void;
  Tick: (data: TickEventData) => void;
}
