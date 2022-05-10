import memoryjs from 'memoryjs';

export const p1CharId = `0x035001B8 0x8 0x0 0xDC`;
export const p1MoveId = `0x035001B8 0x8 0x0 0x350`;
export const p1InputAttack = `0x035001B8 0x8 0x0 0x1A5C`;
export const p1InputDirection = `0x035001B8 0x8 0x0 0xDDC`;

// playerDataOffset + 0x8 + 0x0 + charIdOffset + player2DataOffset
export const p2CharId = `0x035001B8 0x8 0x0 0xDC+0x7840`;
export const p2MoveId = `0x035001B8 0x8 0x0 0x350+0x7840`;
export const p2InputAttack = `0x035001B8 0x8 0x0 0x1A5C+0x7840`;
export const p2InputDirection = `0x035001B8 0x8 0x0 0xDDC+0x7840`;

export function dereferencePointerChain(
  handle: any,
  baseAddress: any,
  chain: string,
  dataType: any = memoryjs.INT32,
): any {
  const offsets = chain.split(' ').map((str) => {
    if (str.includes('+')) {
      return str.split('+').reduce((prev, curr) => prev + Number(curr), 0);
    }
    return Number(str);
  });

  if (offsets.length === 1) {
    return memoryjs.readMemory(handle, baseAddress + offsets[0], dataType);
  }

  let prev: any = baseAddress;
  for (let i = 0; i < offsets.length; i++) {
    if (i === offsets.length - 1) {
      return memoryjs.readMemory(handle, prev + offsets[i], dataType);
    }
    prev = memoryjs.readMemory(handle, prev + offsets[i], memoryjs.PTR);
  }
}
