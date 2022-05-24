// #region Types
export interface PlayerOffsets {
  charId: string;
  moveId: string;
  attackInput: string;
  directionInput: string;
  roundWins: string;
  rank: string;
}
// #endregion

export const p1: PlayerOffsets = {
  charId: `0x34DC030 0xDC`,
  moveId: `0x34DC030 0x350`,
  attackInput: `0x34DC030 0x1A5C`,
  directionInput: `0x34DC030 0xDDC`,
  roundWins: `0x34CA400`, // or 0x35216F8
  rank: `0x34DBF4C`,
};

export const p2: PlayerOffsets = {
  charId: `0x34DC028 0xDC`,
  moveId: `0x34DC028 0x350`,
  attackInput: `0x34DC028 0x1A5C`,
  directionInput: `0x34DC028 0xDDC`,
  roundWins: `0x34CA4F0`,
  rank: `0x343452C`, // FIXME: Wrong address, but I can't find the correct one
};

export const game = {
  roundWinsRequired: `0x34DBF30`,
  opponent: {
    name: `0x34D24A0 0x0 0x8 0x11C`,
    side: `0x34D24A0 0x0 0x8 0x78`, // 0 = P1, 1 = P2
  },
};

export const flags = {
  warmup: `0x34EBDB0`,
  ingame: `0x34FCCEC`,
  gameIsOver: `0x34CA644`,
};
