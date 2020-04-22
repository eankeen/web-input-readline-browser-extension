import { dest, src } from 'gulp'
import plumber from 'gulp-plumber'
import zip from 'gulp-zip'
import del from 'del'

export async function buildPackages() {
  const chromeZip = 'chrome.zip'
  const firefoxZip = 'firefox.zip'
  const sourceZip = 'source.zip'

  del.sync([`dist/${chromeZip}`, `dist/${firefoxZip}`])

  src('dist/chrome/**')
    |> plumber()
    |> zip(chromeZip)
    |> dest('dist')

  src('dist/firefox/**')
    |> plumber()
    |> zip(firefoxZip)
    |> dest('dist')

  src(['./**',  '!node_modules/**', '!dist/**', '!*.log'])
    |> plumber()
    |> zip(sourceZip)
    |> dest('dist')
}
