// https://adventofcode.com/2022/day/2

const input = await Deno.readTextFile('./input.txt')

const rounds = input.split('\r\n')

enum GameScore {
  'AX' = 0 + 3,
  'AY' = 3 + 1,
  'AZ' = 6 + 2,
  'BX' = 0 + 1,
  'BY' = 3 + 2,
  'BZ' = 6 + 3,
  'CX' = 0 + 2,
  'CY' = 3 + 3,
  'CZ' = 6 + 1,
}

type Combination = keyof typeof GameScore

const results = rounds.map((round): number => {
  const combination = round.replace(' ', '') as Combination
  let result = GameScore[combination]
  return result
})

const sum = results.reduce((total, curr) => total + curr, 0)

console.log(sum)
