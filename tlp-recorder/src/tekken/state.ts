import memoryjs, { Process } from 'memoryjs';

import log from '@/helpers/log';
import dereferencePointerChain from '@/helpers/memory';
import * as offsets from '@/tekken/offsets';
import { parseCharacter, parseAttack, parseDirection } from '@/tekken/parser';

// #region Types
export interface PlayerInput {
  direction: string;
  attack: string;
  move: number;
}

export interface GameScore {
  playerWins: number;
  opponentWins: number;
  roundWinsRequired: number;
  outcome: boolean;
}
// #endregion

export default class TekkenState {
  private static instance: TekkenState;

  private process: Process;
  private handle: number;
  private baseAddress: number;

  private playing: boolean = false;

  private constructor() {
    this.process = memoryjs.openProcess('TekkenGame-Win64-Shipping.exe');
    this.handle = this.process.handle;
    this.baseAddress = this.process.modBaseAddr;

    log.debug('Attached to process TekkenGame-Win64-Shipping.exe');

    this.update();
  }

  static getInstance(): TekkenState {
    if (TekkenState.instance) return TekkenState.instance;

    const instance = new TekkenState();
    TekkenState.instance = instance;

    return instance;
  }

  update(): void {
    const isIngame = this.fetchIsIngame();
    const isInWarmup = this.fetchIsInWarmup();
    const isGameOver = this.fetchIsGameOver(); // Outro has already played and score is stale

    if (!isInWarmup && isIngame && !isGameOver && !this.playing) {
      const opponentSide = this.fetchOpponentSide();
      const playerCharacter =
        opponentSide === 1 ? this.fetchP1Character() : this.fetchP2Character();
      const opponentCharacter =
        opponentSide === 1 ? this.fetchP2Character() : this.fetchP1Character();
      const opponentName = this.fetchOpponentName();

      log.debug('Game started');
      log.debug(
        `You are playing as ${playerCharacter}. Your opponent ${opponentName} is playing ${opponentCharacter}`,
      );
      this.playing = true;
    }

    if (this.playing && isGameOver) {
      const { playerWins, opponentWins, outcome } = this.getScore(); // Stale, needs to be fetched earlier
      this.playing = false;

      const result = outcome ? 'win' : 'loss';
      log.debug(`Game ended in a ${result}. Final score: ${playerWins}-${opponentWins}`);
    }
  }

  // #region Private helper functions
  private getValue<T = number>(offset: string, dataType: string = memoryjs.INT32) {
    return dereferencePointerChain<T>(this.handle, this.baseAddress, offset, dataType);
  }

  private getScore(): GameScore {
    const opponentSide = this.fetchOpponentSide();

    const playerWins = opponentSide === 1 ? this.fetchP1RoundWins() : this.fetchP2RoundWins();
    const opponentWins = opponentSide === 1 ? this.fetchP2RoundWins() : this.fetchP1RoundWins();
    const roundWinsRequired = this.fetchRoundWinsRequired();
    const outcome = playerWins > opponentWins; // TODO: I mean this really cannot be a boolean but whatever

    return {
      playerWins,
      opponentWins,
      roundWinsRequired,
      outcome,
    };
  }
  // #endregion

  // #region Player 1
  fetchP1Character(): string {
    const characterId = this.getValue(offsets.p1CharId);
    return parseCharacter(characterId);
  }

  fetchP1Input(): PlayerInput {
    const rawDirectionInput = this.getValue(offsets.p1InputDirection);
    const parsedDirection = parseDirection(rawDirectionInput);
    const rawAttackInput = this.getValue(offsets.p1InputAttack);
    const parsedAttack = parseAttack(rawAttackInput);
    const move = this.getValue(offsets.p1MoveId);
    return { direction: parsedDirection, attack: parsedAttack, move };
  }

  fetchP1RoundWins(): number {
    return this.getValue(offsets.p1RoundWins);
  }
  // #endregion

  // #region Player 2
  fetchP2Character(): string {
    const characterId = this.getValue(offsets.p2CharId);
    return parseCharacter(characterId);
  }

  fetchP2Input(): PlayerInput {
    const rawDirectionInput = this.getValue(offsets.p2InputDirection);
    const parsedDirection = parseDirection(rawDirectionInput);
    const rawAttackInput = this.getValue(offsets.p2InputAttack);
    const parsedAttack = parseAttack(rawAttackInput);
    const move = this.getValue(offsets.p2MoveId);
    return { direction: parsedDirection, attack: parsedAttack, move };
  }

  // eslint-disable-next-line class-methods-use-this
  fetchP2RoundWins(): number {
    return 0;
  }
  // #endregion

  // #region Non player data
  fetchRoundWinsRequired(): number {
    return this.getValue(offsets.roundWinsRequired);
  }

  fetchOpponentName(): string | null {
    try {
      const opponent = this.getValue<string>(offsets.opponentName, memoryjs.STRING);

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
    return this.getValue(offsets.opponentSide);
  }

  /**
   *
   *
   * @return {boolean}
   * @memberof TekkenState
   */
  fetchIsInWarmup(): boolean {
    const bWarmup = this.getValue(offsets.bWarmup);
    return bWarmup === 1;
  }

  /**
   *
   *
   * @return {boolean}
   * @memberof TekkenState
   */
  fetchIsIngame(): boolean {
    const bIngame = this.getValue(offsets.bIngame);
    return bIngame === 1;
  }

  /**
   *
   *
   * @return {boolean}
   * @memberof TekkenState
   */
  fetchIsGameOver(): boolean {
    const bIsGameOver = this.getValue(offsets.bGameIsOver);
    return bIsGameOver !== 0;
  }
  // #endregion
}
