import { differentAs1, indexOf1, is1 } from '../bitwise'

test('check bit is setted on given index', () => {
    const bits = 0b01101
    expect(is1(bits, 0)).toBe(true)
    expect(is1(bits, 1)).toBe(false)
    expect(is1(bits, 2)).toBe(true)
    expect(is1(bits, 3)).toBe(true)
    expect(is1(bits, 4)).toBe(false)
})

test('find index of setted bit', () => {
    expect(indexOf1(0b00001)).toBe(0)
    expect(indexOf1(0b00100)).toBe(2)
    expect(indexOf1(0b01000)).toBe(3)
})

test('mark differences between the parameters with setted bits', () => {
    expect(differentAs1(0b0011, 0b0101)).toBe(0b0110)
})
