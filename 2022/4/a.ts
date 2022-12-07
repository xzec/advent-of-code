// https://adventofcode.com/2022/day/4

const input = await Deno.readTextFile('input.txt')

const groups = input.split('\r\n')

const pairs = groups.map((pair) => pair.split(','))

const containedSum = pairs.reduce((sum, pair) => {
  const first = pair[0].split('-').map(Number)
  const second = pair[1].split('-').map(Number)

  if (first[0] >= second[0] && first[1] <= second[1]) return ++sum
  if (first[0] <= second[0] && first[1] >= second[1]) return ++sum

  return sum
}, 0)

console.log(containedSum)
