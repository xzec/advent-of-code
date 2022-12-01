// https://adventofcode.com/2022/day/1

const input = await Deno.readTextFile('./input.txt')

const elves = input.split('\n\n')

const elfSums = elves.map((elf) =>
  elf.split('\n').reduce((acc, curr) => acc + Number(curr), 0)
)

const maxSum = Math.max(...elfSums)

console.log(maxSum)
