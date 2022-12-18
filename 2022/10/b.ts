// https://adventofcode.com/2022/day/10

import stdout = Deno.stdout

const input = await Deno.readTextFile('input.txt')

const instructions = input.split('\n')

let cycle = 0
let x = 1

const tick = (count: number) => {
  for (let i = 0; i < count; i++) {
    const pixel = [x - 1, x, x + 1].includes(cycle % 40) ? '#' : '.'
    cycle++
    stdout.writeSync(
      new TextEncoder().encode(`${pixel}${cycle % 40 === 0 ? '\n' : ''}`)
    )
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
