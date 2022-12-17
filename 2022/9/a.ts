// https://adventofcode.com/2022/day/9

const input = await Deno.readTextFile('input.txt')

const lines = input.split('\n')

type Direction = 'L' | 'U' | 'R' | 'D'
type Vector2D = [x: number, y: number]
type Movement = [Direction, number]

const head: Vector2D = [0, 0]
const tail: Vector2D = [0, 0]
const tailPositions = new Set<string>(['0,0'])

const moveHead = (direction: Direction) => {
  if (direction === 'L') head[0]--
  if (direction === 'U') head[1]++
  if (direction === 'R') head[0]++
  if (direction === 'D') head[1]--
}

const areTouching = (distance: Vector2D) =>
  distance.every((coordinate) => Math.abs(coordinate) <= 1)

const moveTailIfNecessary = () => {
  const distance: Vector2D = [tail[0] - head[0], tail[1] - head[1]]
  if (areTouching(distance)) return

  tail[0] -= Math.sign(distance[0])
  tail[1] -= Math.sign(distance[1])
  tailPositions.add(tail.join(','))
}

lines.forEach((movement) => {
  const [direction, amount] = movement.split(' ') as Movement

  for (let i = 0; i < +amount; i++) {
    moveHead(direction)
    moveTailIfNecessary()
  }
})

console.log("Number of tail's visited positions:", tailPositions.size)
