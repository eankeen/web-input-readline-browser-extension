import fs from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const fileName = fileURLToPath(import.meta.url)
const dirName = dirname(fileName)
const packageJsonFile = join(dirName, 'package.json')
const manifestFile = join(dirName, 'src/common/manifest.json')

fs.promises
  .readFile(packageJsonFile, { encoding: 'utf8' })
  .then(async (packageJsonRaw) => {
    const version = JSON.parse(packageJsonRaw).version

    return Promise.resolve([version, await fs.promises.readFile(manifestFile)])
  })
  .then(([version, manifestContentsRaw]) => {
    const manifest = JSON.parse(manifestContentsRaw)
    manifest.version = version
    return fs.promises.writeFile(
      manifestFile,
      JSON.stringify(manifest, null, 2)
    )
  })
  .catch((err) => {
    console.error(err)
  })
