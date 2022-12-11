// https://adventofcode.com/2022/day/7

const input = await Deno.readTextFile('input.txt')

type TerminalLine = string

type DirEntry = {
  name: string
  size: number
  isDir: boolean
  isFile: boolean
  children?: DirEntry[]
}

type FileSystem = DirEntry

const fs: FileSystem = {
  name: '/',
  size: 0,
  isDir: true,
  isFile: false,
  children: [],
}

const THRESHOLD_SIZE = 100_000

let sizeOfSuitableDirs = 0

const cdOut = (line: TerminalLine) => line === '$ cd ..'
const cdIn = (line: TerminalLine): boolean =>
  line.startsWith('$ cd ') && !cdOut(line)
const cdOutermost = (line: TerminalLine) => line === '$ cd /'
const isDirOrFile = (line: TerminalLine) => !line.startsWith('$')
const isDir = (line: TerminalLine) => line.startsWith('dir')
const parseSize = (line: TerminalLine) => parseInt(line) || 0
const parseName = (line: TerminalLine) => line.split(' ').pop() as string
const sizeOfDir = (dir: DirEntry) =>
  dir.children?.reduce(
    (total, currentValue) => total + currentValue.size,
    dir.size
  ) || 0

const terminalLines: TerminalLine[] = input.split('\r\n')

const parseTerminalInput = (currentDir: DirEntry) => {
  let line: TerminalLine
  while (terminalLines.length) {
    line = terminalLines.shift() as TerminalLine
    if (cdOutermost(line)) continue

    if (isDirOrFile(line)) {
      if (!currentDir.children) currentDir.children = []
      currentDir.children.push({
        name: parseName(line),
        size: parseSize(line),
        isDir: isDir(line),
        isFile: !isDir(line),
      })
    }

    if (cdIn(line)) {
      const dirName = parseName(line)
      const nextDir = currentDir.children?.find(({ name }) => name === dirName)
      if (!nextDir) throw new Error('No dir to search.')
      parseTerminalInput(nextDir)
    }

    if (cdOut(line)) {
      currentDir.size = sizeOfDir(currentDir)
      if (currentDir.size <= THRESHOLD_SIZE)
        sizeOfSuitableDirs += currentDir.size
      return
    }
  }
  currentDir.size = sizeOfDir(currentDir)
}

parseTerminalInput(fs)

const prettyPrint = (dirEntry: DirEntry, offset = '') => {
  const { name, size, isDir, isFile, children } = dirEntry
  console.log(
    `${offset}- ${name} (${isDir ? 'dir' : 'file'}${
      isFile ? `, size=${size}` : ''
    })`
  )
  if (isDir && children?.length)
    children.forEach((entry) => prettyPrint(entry, `${offset}  `))
}

prettyPrint(fs)

console.log(
  `\nSize of all of the directories with a total size of at most ${THRESHOLD_SIZE.toLocaleString()}:`,
  sizeOfSuitableDirs
)
