# Advent of code

Website: [adventofcode.com](https://adventofcode.com/)

> *Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like. People use them as interview prep, company training, university coursework, practice problems, a speed contest, or to challenge each other.*
> 
> [Source](https://adventofcode.com/about)

## Prerequisites
This is a deno project, so you have to have
- `deno` installed,
- Deno extension for your code editor installed and enabled for this project

## Run
```shell
# cd <year>/<day>
cd 2022/1

deno run --allow-read --watch a.ts
deno run --allow-read --watch b.ts
```

## Project structure

`year/day/`

```
├──📂 2022
│  ├──📂 1
│  │  ├──📄 a.ts
│  │  ├──📄 b.ts
.. │  └──📄 input.txt
   ..
```

- `a.ts` - part one of the challenge
- `b.ts` - part two of the challenge
- `input.txt` - unique input generated for my account

Copyright @ Juraj Zec, 2022
