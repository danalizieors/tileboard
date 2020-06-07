export const is1 = (bits: number, index: number) => 0 < (bits & (1 << index))

export const indexOf1 = (bits: number) => Math.log2(bits)

export const differentAs1 = (bitsA: number, bitsB: number) => bitsA ^ bitsB
