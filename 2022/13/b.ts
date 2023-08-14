// https://adventofcode.com/2022/day/13

const input = await Deno.readTextFile('input.txt')

type Packet = Array<number | Packet>
type Pair = [left: Packet, right: Packet]

const pairs: Pair[] = input
  .split('\n\n')
  .map((pair) => pair.split('\n').map((packet) => JSON.parse(packet))) as Pair[]
const divider1 = [[2]]
const divider2 = [[6]]
pairs.push([divider1, divider2])
const packets = pairs.flat()

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

const sortedPackets = packets.sort((a, b) => {
  const arePacketsInRightOrder = comparePackets(
    structuredClone(a),
    structuredClone(b)
  )
  if (arePacketsInRightOrder || arePacketsInRightOrder === undefined) return -1
  return 1
})

const index1 = sortedPackets.indexOf(divider1) + 1
const index2 = sortedPackets.indexOf(divider2) + 1

console.log(index1 * index2)
