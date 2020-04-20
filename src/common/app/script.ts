import {
  computeBackwardChar,
  computeBackwardWord,
  computeBeginningOfLine,
  computeEndOfLine,
  computeForwardChar,
  computeForwardWord,
} from './util'

function performReadlineShortcuts(
  this: HTMLInputElement,
  e: KeyboardEvent
): void {
  const string: string = (e.target as HTMLInputElement).value
  const start: number = (e.target as HTMLInputElement).selectionStart
  const end: number = (e.target as HTMLInputElement).selectionEnd

  // we do not support crap when highlighting
  if (start !== end) return

  if (e.ctrlKey && e.code === 'KeyA') {
    e.preventDefault()
    const newPos = computeBeginningOfLine()
    this.setSelectionRange(newPos, newPos)
  }

  if (e.ctrlKey && e.code === 'KeyE') {
    e.preventDefault()
    const newPos = computeEndOfLine(string)
    this.setSelectionRange(newPos, newPos)
  }

  if (e.ctrlKey && e.code === 'KeyF') {
    e.preventDefault()

    const newPos = computeForwardChar(string, start)
    this.setSelectionRange(newPos, newPos)
  }

  if (e.ctrlKey && e.code === 'KeyB') {
    e.preventDefault()

    const newPos = computeBackwardChar(string, start)
    this.setSelectionRange(newPos, newPos)
  }

  if (e.altKey && e.code === 'KeyF') {
    e.preventDefault()

    const newPos = computeForwardWord(string, start)
    this.setSelectionRange(newPos, newPos)
  }

  if (e.altKey && e.code === 'KeyB') {
    e.preventDefault()

    const newPos = computeBackwardWord(string, start)
    this.setSelectionRange(newPos, newPos)
  }

  if (e.altKey && e.code === 'Backspace') {
    const newPos = computeBackwardWord(string, start)
    // assume newPos is *before* start
    this.value = string.slice(0, newPos) + string.slice(start)
    this.setSelectionRange(newPos, newPos)
  }
}

for (let el of document.querySelectorAll('input')) {
  el.addEventListener('keydown', performReadlineShortcuts)
}
