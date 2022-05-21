import memoryjs from 'memoryjs';

export default function dereferencePointerChain<T>(
  handle: number,
  baseAddress: number,
  chain: string,
  dataType: string,
): T {
  const offsets = chain.split(' ').map((str) => {
    if (str.includes('+')) {
      return str.split('+').reduce((prev, curr) => prev + Number(curr), 0);
    }
    return Number(str);
  });

  if (offsets.length === 1) {
    return memoryjs.readMemory<T>(handle, baseAddress + offsets[0], dataType);
  }

  let prev = baseAddress;
  for (let i = 0; i < offsets.length; i++) {
    if (i === offsets.length - 1) {
      return memoryjs.readMemory<T>(handle, prev + offsets[i], dataType);
    }
    prev = memoryjs.readMemory<number>(handle, prev + offsets[i], memoryjs.POINTER);
  }

  throw new Error(`Could not read process memory at ${chain}`);
}
