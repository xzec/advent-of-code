// https://adventofcode.com/2022/day/3

const input = await Deno.readTextFile('input.txt')

const rucksacks = input.split('\r\n')

const groups = []

for (let i = 0; i < rucksacks.length; i += 3) {
  groups.push([rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]])
}

const sameItems = groups.map(([first, second, third]) =>
  first.split('').find((item) => second.includes(item) && third.includes(item))
) as string[]

console.log(sameItems)

const priorities = sameItems.map((item) => {
  const asciiCode = item.charCodeAt(0)
  if (asciiCode >= 97) return asciiCode - 96
  if (asciiCode >= 65) return asciiCode - 38
  throw new Error('ASCII code mismatch.')
})

const sum = priorities.reduce((total, curr) => total + curr, 0)

console.log(sum)
