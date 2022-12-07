// https://adventofcode.com/2022/day/5

const input = await Deno.readTextFile('input.txt')

const [dock, procedure] = input.split('\r\n\r\n')

const stackCount = Number(dock.at(-1))

const dockFloors = dock.split('\r\n')

dockFloors.pop()

const stacks: string[][] = Array.from(Array(stackCount), () => [])

dockFloors.reverse().reduce((stacks, floor) => {
  for (let i = 0; i < floor.length; i += 4) {
    const crate = floor[i + 1]
    if (crate === ' ') continue
    stacks[i / 4].push(crate)
  }
  return stacks
}, stacks)

const steps = procedure.split('\r\n')

steps.forEach((step) => {
  const extractedSteps = step.match(/\d+/g)
  if (!extractedSteps) throw new Error('Failed to extract steps.')
  const [amount, from, to] = extractedSteps.map(Number)
  const batch = stacks[from - 1].splice(-amount)
  stacks[to - 1].push(...batch)
})

const topRow = stacks.map((stack) => stack.at(-1)).join('')

console.log(stacks, topRow)
