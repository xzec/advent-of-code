// https://adventofcode.com/2022/day/8

const input = await Deno.readTextFile('input.txt')

type Matrix = number[][]

const forest: Matrix = input
  .split('\r\n')
  .map((row) => row.split('').map(Number))

const isEdge = (position: number, dimension: number) =>
  position === 0 || position === dimension - 1

const transpose = (matrix: Matrix) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]))

const measureViewingDistance = (trees: number[], tree: number) => {
  let distance = 0
  for (distance; distance < trees.length; distance++) {
    if (trees[distance] >= tree) return distance + 1
  }
  return distance
}

const transposedForest = transpose(forest)

let highestScenicScore = 0

for (let i = 0; i < forest.length; i++) {
  if (isEdge(i, forest.length)) continue
  const row = forest[i]

  for (let j = 0; j < row.length; j++) {
    if (isEdge(j, row.length)) continue
    const tree = row[j]
    const column = transposedForest[j]

    const left = row.slice(0, j)
    const right = row.slice(j + 1)
    const top = column.slice(0, i)
    const bottom = column.slice(i + 1)

    const leftDistance = measureViewingDistance(left.reverse(), tree)
    const rightDistance = measureViewingDistance(right, tree)
    const topDistance = measureViewingDistance(top.reverse(), tree)
    const bottomDistance = measureViewingDistance(bottom, tree)

    const scenicScore =
      leftDistance * rightDistance * topDistance * bottomDistance

    if (scenicScore > highestScenicScore) highestScenicScore = scenicScore
  }
}

console.log('Highest scenic score:', highestScenicScore)
