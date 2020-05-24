import { adder } from './adder'

const result = 1 + 2

console.log('1 + 2 = ', result)

const randomCalculations = () => {
    const a = Math.random() * 10
    const b = Math.random() * 10

    console.log(`${a} + ${b} = ${adder(a, b)}`)

    setTimeout(randomCalculations, 1000)
}

randomCalculations()
