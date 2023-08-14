// https://adventofcode.com/2022/day/13

const input = await Deno.readTextFile('input.txt')

type Packet = Array<number | Packet>
type Pair = [left: Packet, right: Packet]

const pairs: Pair[] = input
  .split('\n\n')
  .map((pair) => pair.split('\n').map((packet) => JSON.parse(packet))) as Pair[]

const comparePackets = (left: Packet, right: Packet): boolean | undefined => {
  while (Math.min(left.length, right.length)) {
    const l = left.shift() as Packet[number]
    const r = right.shift() as Packet[number]
    if (typeof l === 'number' && typeof r === 'number') {
      if (l < r) return true
      if (r < l) return false
    } else {
      const res = comparePackets(
        Array.isArray(l) ? l : [l],
        Array.isArray(r) ? r : [r]
      )
      if (res !== undefined) return res
    }
  }
  if (left.length !== right.length) return !left.length
  return undefined
}

let sumOfIndicesOfPacketsInRightOrder = 0

for (let i = 0; i < pairs.length; i++) {
  const [left, right] = pairs[i]
  const arePacketsInRightOrder = comparePackets(
    structuredClone(left),
    structuredClone(right)
  )
  if (arePacketsInRightOrder === false) continue
  sumOfIndicesOfPacketsInRightOrder += i + 1
}

console.log(sumOfIndicesOfPacketsInRightOrder)
