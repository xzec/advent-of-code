import { DenonConfig } from 'https://deno.land/x/denon@2.5.0/mod.ts'

const config: DenonConfig = {
  scripts: {},
  watcher: {
    interval: 350,
    exts: ['ts', 'txt'],
    match: ['**/*.*'],
    legacy: false,
  },
  logger: {
    fullscreen: true,
    debug: false,
    quiet: false,
  },
}

export default config
