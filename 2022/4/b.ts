// https://adventofcode.com/2022/day/4

const input = await Deno.readTextFile('input.txt')

const groups = input.split('\r\n')

const pairs = groups.map((pair) => pair.split(','))

type Range = [start: number, end: number]

const arrayFromRange = ([start, end]: Range) =>
  Array(end - start + 1)
    .fill(0)
    .map((_, i) => i + start)

const isOverlap = (array1: number[], array2: number[]) =>
  array1.some((item) => array2.includes(item))

const overlapSum = pairs.reduce((sum, pair) => {
  const first = pair[0].split('-').map(Number) as Range
  const second = pair[1].split('-').map(Number) as Range

  if (isOverlap(arrayFromRange(first), arrayFromRange(second))) return ++sum

  return sum
}, 0)

console.log(overlapSum)
