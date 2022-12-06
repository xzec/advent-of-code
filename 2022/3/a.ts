// https://adventofcode.com/2022/day/3

const input = await Deno.readTextFile('input.txt')

const rucksacks = input.split('\r\n')

const splitRucksacks = rucksacks.map((rucksack) => [
  rucksack.slice(0, rucksack.length / 2),
  rucksack.slice(rucksack.length / 2, rucksack.length),
])

const sameItems = splitRucksacks.map(([first, second]) =>
  first.split('').find((item) => second.includes(item))
) as string[]

const priorities = sameItems.map((item) => {
  const asciiCode = item.charCodeAt(0)
  if (asciiCode >= 97) return asciiCode - 96
  if (asciiCode >= 65) return asciiCode - 38
  throw new Error('ASCII code mismatch.')
})

const sum = priorities.reduce((total, curr) => total + curr, 0)

console.log(sum)
