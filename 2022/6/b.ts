// https://adventofcode.com/2022/day/6

const input = await Deno.readTextFile('input.txt')

const MARKER_LENGTH = 14

for (let i = 0; i < input.length; i++) {
  const quaternion = input.slice(i, i + MARKER_LENGTH)
  if (new Set(quaternion).size === MARKER_LENGTH) {
    console.log(i + MARKER_LENGTH)
    break
  }
}
