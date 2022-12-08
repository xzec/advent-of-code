// https://adventofcode.com/2022/day/6

const input = await Deno.readTextFile('input.txt')

for (let i = 0; i < input.length; i++) {
  const quaternion = input.slice(i, i + 4)
  if (new Set(quaternion).size === 4) {
    console.log(i + 4)
    break
  }
}
