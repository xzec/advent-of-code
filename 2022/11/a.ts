// https://adventofcode.com/2022/day/11

const input = await Deno.readTextFile('input.txt')

type Operand = 'old' | number
type Operator = '*' | '+'
type Operation = [Operand, Operator, Operand]
type Monkey = {
  id: number
  startingItems: number[]
  operation: Operation
  divisibleBy: number
  ifYes: number
  ifNot: number
  inspectCount: number
}
type Monkeys = Monkey[]

const monkeyDefs = input.split('Monkey ').filter(Boolean)

const parseMonkey = (monkeyDef: string): Monkey => {
  const monkey = monkeyDef.split('\n')

  return {
    id: parseInt(monkey[0], 10),
    startingItems: Array.from(monkey[1].matchAll(/\d+/g)).flatMap(
      (item) => +item
    ),
    operation: monkey[2]
      .split('new = ')
      .pop()
      ?.split(' ')
      .map((item) => +item || item) as Operation,
    divisibleBy: Number(monkey[3].match(/\d+/)?.pop() as string),
    ifYes: Number(monkey[4].match(/\d+/)?.pop() as string),
    ifNot: Number(monkey[5].match(/\d+/)?.pop() as string),
    inspectCount: 0,
  }
}

const ROUNDS = 20

const monkeys: Monkeys = monkeyDefs.map(parseMonkey)

const findMonkey = (id: number) => {
  const monkey = monkeys.find((monkey) => monkey.id === id)
  if (!monkey) throw new Error(`Invalid monkey id ${id}`)
  return monkey
}

for (let i = 0; i < ROUNDS; i++) {
  monkeys.forEach((monkey) => {
    const [a, operator, b] = monkey.operation

    while (monkey.startingItems.length) {
      const item = monkey.startingItems.shift() as number

      const left = a === 'old' ? item : a
      const right = b === 'old' ? item : b

      const newItem = Math.floor(
        (operator === '*' ? left * right : left + right) / 3
      )

      const isDivisible = newItem % monkey.divisibleBy === 0

      let targetMonkey: Monkey
      if (isDivisible) targetMonkey = findMonkey(monkey.ifYes)
      else targetMonkey = findMonkey(monkey.ifNot)

      targetMonkey.startingItems.push(newItem)
      monkey.inspectCount++
    }
  })
}

const monkeyBusiness = monkeys
  .sort((a, b) => b.inspectCount - a.inspectCount)
  .slice(0, 2)
  .reduce((total, { inspectCount }) => total * inspectCount, 1)

console.log(monkeyBusiness)
