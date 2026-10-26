import { copyFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const distDir = fileURLToPath(new URL('../dist/', import.meta.url))

await copyFile(join(distDir, 'index.html'), join(distDir, '404.html'))
await writeFile(join(distDir, '.nojekyll'), '')
