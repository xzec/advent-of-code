// https://adventofcode.com/2022/day/9

const input = await Deno.readTextFile('input.txt')

const lines = input.split('\n')

type Direction = 'L' | 'U' | 'R' | 'D'
type Vector2D = [x: number, y: number]
type Movement = [Direction, number]
type Rope = Vector2D[]

const ROPE_LENGTH = 10
const rope: Rope = Array.from(Array(ROPE_LENGTH), () => [0, 0])
const head = rope[0]
const tail = rope.at(-1) as Vector2D
const tailPositions = new Set<string>(['0,0'])

const moveHead = (direction: Direction) => {
  if (direction === 'L') head[0]--
  if (direction === 'U') head[1]++
  if (direction === 'R') head[0]++
  if (direction === 'D') head[1]--
}

const areTouching = (distance: Vector2D) =>
  distance.every((coordinate) => Math.abs(coordinate) <= 1)

const moveKnotIfNecessary = (knot: Vector2D) => {
  const prev = rope[rope.indexOf(knot) - 1]
  const distance: Vector2D = [knot[0] - prev[0], knot[1] - prev[1]]
  if (areTouching(distance)) return

  knot[0] -= Math.sign(distance[0])
  knot[1] -= Math.sign(distance[1])
  if (knot === tail) tailPositions.add(knot.join(','))
}

lines.forEach((movement) => {
  const [direction, amount] = movement.split(' ') as Movement

  for (let i = 0; i < +amount; i++) {
    moveHead(direction)
    for (let j = 1; j < ROPE_LENGTH; j++) {
      moveKnotIfNecessary(rope[j])
    }
  }
})

console.log("Number of tail's visited positions:", tailPositions.size)
