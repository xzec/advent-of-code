// https://adventofcode.com/2022/day/12

const input = await Deno.readTextFile('input.txt')

const lines = input.split('\n')

type Position = [r: number, c: number]
type Square = {
  elevation: string
  visited: boolean
  distance: number
  position: Position
}
type Heightmap = Square[][]

const heightmap: Heightmap = []
let queue: Square[] = []
const possibleStartingPoints: Square[] = []
let shortestDistance = Infinity

lines.forEach((line, r) => {
  const row = line.split('').map((elevation, c) => {
    const square = {
      elevation,
      visited: false,
      distance: Infinity,
      position: [r, c] as Position,
    }
    if (['S', 'a'].includes(elevation)) possibleStartingPoints.push(square)
    return square
  })
  heightmap.push(row)
})

const isNeighborReachable = (a: string, b: string) => {
  const square = (a === 'S' ? 'a' : a).charCodeAt(0)
  const neighbor = (b === 'E' ? 'z' : b).charCodeAt(0)
  return neighbor <= square + 1
}

const getSuitableSquareNeighbors = (square: Square): Square[] => {
  const [r, c] = square.position
  return [
    heightmap[r - 1]?.[c],
    heightmap[r + 1]?.[c],
    heightmap[r][c - 1],
    heightmap[r][c + 1],
  ].filter((neighbor) => {
    if (!neighbor || neighbor.visited || queue.includes(neighbor)) return false
    return isNeighborReachable(square.elevation, neighbor.elevation)
  })
}

const resetHeightmap = () =>
  heightmap.forEach((row) =>
    row.forEach((square) => {
      square.visited = false
      square.distance = Infinity
    })
  )

shortestDistanceSearch: for (const possibleStartingPoint of possibleStartingPoints) {
  queue = [possibleStartingPoint]
  possibleStartingPoint.distance = 0

  while (queue.length > 0) {
    const square = queue.shift() as Square

    if (square.elevation === 'E') {
      if (square.distance < shortestDistance) shortestDistance = square.distance
      continue shortestDistanceSearch
    }

    square.visited = true

    const neighbors = getSuitableSquareNeighbors(square)
    neighbors.forEach((neighbor) => (neighbor.distance = square.distance + 1))
    queue.push(...neighbors)
  }

  resetHeightmap()
}

console.log(shortestDistance)
