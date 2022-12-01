// https://adventofcode.com/2022/day/1

const input = await Deno.readTextFile('./input.txt')

const elves = input.split('\n\n')

const elfSums = elves.map((elf) =>
  elf.split('\n').reduce((acc, curr) => acc + Number(curr), 0)
)

let total = 0

for (let i = 0; i < 3; i++) {
  const max = Math.max(...elfSums)
  total += max
  elfSums[elfSums.indexOf(max)] = 0
}

console.log(total)
