import memoryjs, { Process } from 'memoryjs';

import log from '@/helpers/log';
import dereferencePointerChain from '@/helpers/memory';
import * as offsets from '@/tekken/offsets';
import { PlayerOffsets } from '@/tekken/offsets';
import { parseCharacter, parseAttack, parseDirection } from '@/tekken/parser';

// #region Types
export interface PlayerInput {
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
// #endregion

export default class GameState {
  private static instance: GameState;

  private process: Process;
  private handle: number;
  private baseAddress: number;

  private playing: boolean = false;
  private finalScore: MatchScore | null = null;

  private constructor() {
    this.process = memoryjs.openProcess('TekkenGame-Win64-Shipping.exe');
    this.handle = this.process.handle;
    this.baseAddress = this.process.modBaseAddr;

    log.debug('Attached to process TekkenGame-Win64-Shipping.exe');
  }

  static getInstance(): GameState {
    if (GameState.instance) return GameState.instance;

    const instance = new GameState();
    GameState.instance = instance;

    return instance;
  }

  update(): void {
    const isIngame = this.fetchIsIngame();
    const isInWarmup = this.fetchIsInWarmup();
    const isGameOver = this.fetchIsGameOver(); // Outro has already played and score is stale

    if (!isInWarmup && isIngame && !isGameOver && !this.playing) {
      const { playerOffsets, opponentOffsets } = this.getPlayerOffsets();
      const playerCharacter = this.fetchCharacter(playerOffsets);
      const opponentCharacter = this.fetchCharacter(opponentOffsets);
      const opponentName = this.fetchOpponentName();

      log.debug('Game started');
      log.debug(`Playing ${playerCharacter} against ${opponentName}'s ${opponentCharacter}`);
      this.playing = true;
    }

    if (this.playing && !this.finalScore) {
      const score = this.getScore();
      if (score.outcome !== MatchResult.UNRESOLVED) {
        this.finalScore = score;
      }
    }

    if (this.playing && isGameOver) {
      // broadcast game ended event

      if (this.finalScore) {
        const { playerWins, opponentWins, outcome } = this.finalScore;
        this.playing = false;
        this.finalScore = null;
        log.debug(`Game ended in a ${outcome}. Final score: ${playerWins}-${opponentWins}`);
      }
    }
  }

  // #region Private helper functions
  private getValue<T = number>(offset: string, dataType: string = memoryjs.INT32) {
    return dereferencePointerChain<T>(this.handle, this.baseAddress, offset, dataType);
  }

  private getScore(): MatchScore {
    const { playerOffsets, opponentOffsets } = this.getPlayerOffsets();

    const playerWins = this.fetchRoundWins(playerOffsets);
    const opponentWins = this.fetchRoundWins(opponentOffsets);
    const roundWinsRequired = this.fetchRoundWinsRequired();

    const unresolvedScore: Omit<MatchScore, 'outcome'> = {
      playerWins,
      opponentWins,
      roundWinsRequired,
    };

    const outcome = GameState.calculateMatchResult(unresolvedScore);

    return {
      ...unresolvedScore,
      outcome,
    };
  }

  private static calculateMatchResult(unresolvedScore: Omit<MatchScore, 'outcome'>): MatchResult {
    const { playerWins, opponentWins, roundWinsRequired } = unresolvedScore;

    if (playerWins > opponentWins && playerWins === roundWinsRequired) {
      return MatchResult.WIN;
    }

    if (playerWins < opponentWins && opponentWins === roundWinsRequired) {
      return MatchResult.LOSS;
    }

    if (opponentWins === roundWinsRequired && playerWins === roundWinsRequired) {
      return MatchResult.DRAW;
    }

    return MatchResult.UNRESOLVED;
  }

  private getPlayerOffsets() {
    const opponentSide = this.fetchOpponentSide();
    if (opponentSide === 1) {
      return {
        playerOffsets: offsets.p1,
        opponentOffsets: offsets.p2,
      };
    }

    return {
      playerOffsets: offsets.p2,
      opponentOffsets: offsets.p1,
    };
  }
  // #endregion

  // #region Player
  fetchCharacter(playerOffsets: PlayerOffsets): string {
    const characterId = this.getValue(playerOffsets.charId);
    return parseCharacter(characterId);
  }

  fetchInput(playerOffsets: PlayerOffsets): PlayerInput {
    const rawDirectionInput = this.getValue(playerOffsets.directionInput);
    const parsedDirection = parseDirection(rawDirectionInput);
    const rawAttackInput = this.getValue(playerOffsets.attackInput);
    const parsedAttack = parseAttack(rawAttackInput);
    const move = this.getValue(playerOffsets.moveId);
    return { direction: parsedDirection, attack: parsedAttack, move };
  }

  fetchRoundWins(playerOffsets: PlayerOffsets): number {
    return this.getValue(playerOffsets.roundWins);
  }
  // #endregion

  // #region Non player data
  fetchRoundWinsRequired(): number {
    return this.getValue(offsets.game.roundWinsRequired);
  }

  fetchOpponentName(): string | null {
    try {
      const opponent = this.getValue<string>(offsets.game.opponent.name, memoryjs.STRING);

      if (typeof opponent !== 'string') return null;
      if (opponent.length < 2 || opponent.length > 32) return null;

      return opponent;
    } catch (err) {
      return null;
    }
  }

  /**
   * Gets the side that the opponent is playing on.
   * If the opponent is playing as player 1, it will be 0.
   * If the opponent is playing as player 2, it will be 1.
   *
   * @return {number} Returns 0 if the opponent is player 1 and 1 if the opponent is player 2.
   * @memberof TekkenState
   */
  fetchOpponentSide(): number {
    return this.getValue(offsets.game.opponent.side);
  }

  /**
   *
   *
   * @return {boolean}
   * @memberof TekkenState
   */
  fetchIsInWarmup(): boolean {
    const bWarmup = this.getValue(offsets.flags.warmup);
    return bWarmup === 1;
  }

  /**
   *
   *
   * @return {boolean}
   * @memberof TekkenState
   */
  fetchIsIngame(): boolean {
    const bIngame = this.getValue(offsets.flags.ingame);
    return bIngame === 1;
  }

  /**
   *
   *
   * @return {boolean}
   * @memberof TekkenState
   */
  fetchIsGameOver(): boolean {
    const bIsGameOver = this.getValue(offsets.flags.gameIsOver);
    return bIsGameOver !== 0;
  }
  // #endregion
}
