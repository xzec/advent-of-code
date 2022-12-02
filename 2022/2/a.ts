// https://adventofcode.com/2022/day/2

const input = await Deno.readTextFile('./input.txt')

const rounds = input.split('\r\n')

enum InitialScore {
  X = 1,
  Y = 2,
  Z = 3,
}

enum GameScore {
  'AX' = 3,
  'AY' = 6,
  'AZ' = 0,
  'BX' = 0,
  'BY' = 3,
  'BZ' = 6,
  'CX' = 6,
  'CY' = 0,
  'CZ' = 3,
}

type Move = keyof typeof InitialScore

type Combination = keyof typeof GameScore

const results = rounds.map((round): number => {
  const myMove = round.at(-1) as Move
  let result = InitialScore[myMove]
  const combination = round.replace(' ', '') as Combination
  result += GameScore[combination]
  return result
})

const sum = results.reduce((total, curr) => total + curr, 0)

console.log(sum)
