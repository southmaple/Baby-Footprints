import { spawn } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

const appRoot = fileURLToPath(new URL('../', import.meta.url))
const viteEntry = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url))
const playwrightCli = fileURLToPath(
  new URL('../node_modules/@playwright/test/cli.js', import.meta.url),
)
const isCi = Boolean(process.env.CI)
const port = isCi ? 4173 : 5173
const basePath = process.env.VITE_BASE_PATH || '/'
const baseUrl = new URL(basePath, `http://127.0.0.1:${port}`).toString()
let server
let shuttingDown = false

async function isServerReady() {
  try {
    const response = await fetch(baseUrl, { signal: AbortSignal.timeout(1_000) })
    return response.ok
  } catch {
    return false
  }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (await isServerReady()) return
    if (server?.exitCode != null) {
      throw new Error(`Vite exited before becoming ready (code ${server.exitCode})`)
    }
    await delay(500)
  }
  throw new Error(`Vite did not become ready at ${baseUrl}`)
}

async function stopServer() {
  if (!server || server.exitCode != null) return
  if (shuttingDown) return
  shuttingDown = true

  const exited = new Promise((resolve) => server.once('exit', resolve))
  server.kill('SIGTERM')
  await Promise.race([exited, delay(2_000)])

  if (server.exitCode == null) {
    server.kill('SIGKILL')
  }
}

async function runPlaywright() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [playwrightCli, 'test', ...process.argv.slice(2)], {
      cwd: appRoot,
      env: { ...process.env, PLAYWRIGHT_BASE_URL: baseUrl },
      stdio: 'inherit',
      windowsHide: true,
    })

    child.once('error', reject)
    child.once('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`Playwright exited after signal ${signal}`))
        return
      }
      resolve(code ?? 1)
    })
  })
}

try {
  if (await isServerReady()) {
    console.log(`Reusing server at ${baseUrl}`)
  } else {
    const viteArgs = [
      ...(isCi ? ['preview'] : []),
      '--host',
      '127.0.0.1',
      '--port',
      String(port),
      '--strictPort',
    ]
    server = spawn(process.execPath, [viteEntry, ...viteArgs], {
      cwd: appRoot,
      env: { ...process.env, FORCE_COLOR: '0' },
      stdio: 'inherit',
      windowsHide: true,
    })
    await waitForServer()
  }

  process.exitCode = await runPlaywright()
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
} finally {
  await stopServer()
}
