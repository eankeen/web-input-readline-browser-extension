// @ts-nocheck
import through from 'through2'
import htmlMinify from 'gulp-htmlmin'
import { dest, src } from 'gulp'
import plumber from 'gulp-plumber'
import markdown from 'gulp-markdown'
import zip from 'gulp-zip'
import rename from 'gulp-rename'
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

export async function docs() {
  const markdownFile = 'readme.md'

  src(markdownFile)
    |> plumber()
    |> markdown()
    |> rename('index.html')
    |> addTags()
    |> htmlMinify({ collapseWhitespace: true })
    |> dest('docs')
}

function addTags() {
  return through.obj((file, enc, cb) => {
    let siteHtml = String(file.contents);

    const newSiteHtml = `
      <!DOCTYPE html> \
      <html> \
        <head> \
          <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin> \
          <link rel="dns-prefetch" href="https://cdn.jsdelivr.net"> \
          <link \
            rel="stylesheet" \
            href="https://cdn.jsdelivr.net/npm/fox-css/dist/fox.dark.min.css" \
          > \
        </head> \
        <body> \
          ${siteHtml} \
        </body> \
      </html>`

    file.contents = new Buffer.from(newSiteHtml);
    return cb(null, file);
  });
}
