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

const transposedForest = transpose(forest)

let visibleTrees = 0

for (let i = 0; i < forest.length; i++) {
  if (isEdge(i, forest.length)) {
    visibleTrees += forest.length
    continue
  }
  const row = forest[i]
  for (let j = 0; j < row.length; j++) {
    if (isEdge(j, row.length)) {
      visibleTrees += 1
      continue
    }
    const tree = row[j]
    const column = transposedForest[j]

    const left = row.slice(0, j)
    const right = row.slice(j + 1)
    const top = column.slice(0, i)
    const bottom = column.slice(i + 1)

    const minMax = Math.min(
      ...[left, right, top, bottom].map((array) => Math.max(...array))
    )
    if (tree > minMax) visibleTrees++
  }
}

console.log(visibleTrees)
