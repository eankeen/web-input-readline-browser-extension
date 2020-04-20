import {
  computeBackwardChar,
  computeBackwardWord,
  computeBeginningOfLine,
  computeEndOfLine,
  computeForwardChar,
  computeForwardWord,
} from './util'

function performReadlineShortcuts(e: KeyboardEvent): void {
  // @ts-ignore
  const string = e.target.value
  // @ts-ignore
  const start = e.target.selectionStart
  // @ts-ignore
  const end = e.target.selectionEnd

  // we do not support crap when highlighting
  if (start !== end) return

  if (e.ctrlKey && e.code === 'KeyA') {
    e.preventDefault()
    const newPos = computeBeginningOfLine()
    // @ts-ignore
    this.setSelectionRange(newPos, newPos)
  }

  if (e.ctrlKey && e.code === 'KeyE') {
    e.preventDefault()
    const newPos = computeEndOfLine(string)
    // @ts-ignore
    this.setSelectionRange(newPos, newPos)
  }

  if (e.ctrlKey && e.code === 'KeyF') {
    e.preventDefault()

    const newPos = computeForwardChar(string, start)
    // @ts-ignore
    this.setSelectionRange(newPos, newPos)
  }

  if (e.ctrlKey && e.code === 'KeyB') {
    e.preventDefault()

    const newPos = computeBackwardChar(string, start)
    // @ts-ignore
    this.setSelectionRange(newPos, newPos)
  }

  if (e.altKey && e.code === 'KeyF') {
    e.preventDefault()

    const newPos = computeForwardWord(string, start)
    // @ts-ignore
    this.setSelectionRange(newPos, newPos)
  }

  if (e.altKey && e.code === 'KeyB') {
    e.preventDefault()

    const newPos = computeBackwardWord(string, start)
    // @ts-ignore
    this.setSelectionRange(newPos, newPos)
  }
}

for (let el of document.querySelectorAll('input')) {
  el.addEventListener('keydown', performReadlineShortcuts)
}
