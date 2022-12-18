// https://adventofcode.com/2022/day/10

const input = await Deno.readTextFile('input.txt')

const instructions = input.split('\n')

let cycle = 0
let x = 1
let signalStrength = 0
const observedCycles = Array.from(Array(6), (_, i) => 20 + i * 40)

const tick = (count: number) => {
  for (let i = 0; i < count; i++) {
    cycle++
    if (observedCycles.includes(cycle)) signalStrength += cycle * x
  }
}

while (instructions.length) {
  const instruction = instructions.shift() as string

  if (instruction === 'noop') {
    tick(1)
    continue
  }

  const amount = instruction.match(/-?\d+/)
  if (amount === null) throw new Error('Failed to parse addx.')

  tick(2)
  x += +amount
}

console.log(signalStrength)
