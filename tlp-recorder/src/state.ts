import memoryjs from 'memoryjs';

import * as offsets from './offsets.js';

export default class TekkenState {
  private static instance: TekkenState;

  private process: any;
  private handle: any;
  private baseAddress: any;

  private constructor() {
    this.process = memoryjs.openProcess('TekkenGame-Win64-Shipping.exe');
    this.handle = this.process.handle;
    this.baseAddress = this.process.modBaseAddr;
  }

  static getInstance(): TekkenState {
    if (TekkenState.instance) return TekkenState.instance;

    const instance = new TekkenState();
    TekkenState.instance = instance;

    return instance;
  }

  getValue(offset: string, dataType: any = 'int32') {
    return offsets.dereferencePointerChain(this.handle, this.baseAddress, offset, dataType);
  }

  getSnapshot() {
    return {
      p1CharId: this.getValue(offsets.p1CharId),
      p2CharId: this.getValue(offsets.p2CharId),
      p1MoveId: this.getValue(offsets.p1MoveId),
      p2MoveId: this.getValue(offsets.p2MoveId),
      p1InputAttack: this.parseAttack(this.getValue(offsets.p1InputAttack)),
      p2InputAttack: this.parseAttack(this.getValue(offsets.p2InputAttack)),
      p1InputDirection: this.parseDirection(this.getValue(offsets.p1InputDirection)),
      p2InputDirection: this.parseDirection(this.getValue(offsets.p2InputDirection)),
    };
  }

  parseDirection(direction: any) {
    switch (direction) {
      case 2:
        return 'd/b';
      case 4:
        return 'd';
      case 8:
        return 'd/f';
      case 16:
        return 'b';
      case 32:
        return 'n';
      case 64:
        return 'f';
      case 128:
        return 'u/b';
      case 256:
        return 'u';
      case 512:
        return 'u/f';
      default:
        return '';
    }
  }

  parseAttack(attack: any) {
    switch (attack) {
      case 512:
        return '1';
      case 1024:
        return '2';
      case 2048:
        return '3';
      case 4096:
        return '4';
      case 1536:
        return '1+2';
      case 2560:
        return '1+3';
      case 4608:
        return '1+4';
      case 3072:
        return '2+3';
      case 6144:
        return '3+4';
      case 3584:
        return '1+2+3';
      case 6656:
        return '1+3+4';
      case 7168:
        return '2+3+4';
      case 7680:
        return '1+2+3+4';
      case 8192:
        return 'RAGE';
      default:
        return '';
    }
  }
}
