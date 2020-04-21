import {
  computeBackwardChar,
  computeBackwardWord,
  computeBeginningOfLine,
  computeEndOfLine,
  computeForwardChar,
  computeForwardWord,
  deleteTextCursorSelection,
  getStringStartEnd,
  modifyTextCursorSelection,
} from './util'

function performReadlineShortcuts(this: EventTarget, e: KeyboardEvent): void {
  const [string, start, end] = getStringStartEnd.call(this, e)

  // if dom element not handled with our case, ignore
  if (!string ?? !start ?? !end) return

  // do not do anything on highlight
  if (start !== end) return

  if (e.ctrlKey && e.code === 'KeyA') {
    e.preventDefault()

    const newStart = computeBeginningOfLine()
    modifyTextCursorSelection.call(this, newStart, newStart)
  }
  if (e.ctrlKey && e.code === 'KeyE') {
    e.preventDefault()

    const newStart = computeEndOfLine(string)
    modifyTextCursorSelection.call(this, newStart, newStart)
  }

  if (e.ctrlKey && e.code === 'KeyF') {
    e.preventDefault()

    const newStart = computeForwardChar(string, start)
    modifyTextCursorSelection.call(this, newStart, newStart)
  }

  if (e.ctrlKey && e.code === 'KeyB') {
    e.preventDefault()

    const newStart = computeBackwardChar(string, start)
    modifyTextCursorSelection.call(this, newStart, newStart)
  }

  if (e.altKey && e.code === 'KeyF') {
    e.preventDefault()

    const newStart = computeForwardWord(string, start)
    modifyTextCursorSelection.call(this, newStart, newStart)
  }

  if (e.altKey && e.code === 'KeyB') {
    e.preventDefault()

    const newStart = computeBackwardWord(string, start)
    modifyTextCursorSelection.call(this, newStart, newStart)
  }

  if (e.altKey && e.code === 'Backspace') {
    e.preventDefault()

    const newStart = computeBackwardWord(string, start)
    // assume newPos is *before* start
    deleteTextCursorSelection.call(this, string, newStart, start)

    // after deleting text, we have to readjust the cursor
    modifyTextCursorSelection.call(this, newStart, newStart)
  }
}

for (let el of document.querySelectorAll('input')) {
  el.addEventListener('keydown', performReadlineShortcuts)
}

for (let el of document.querySelectorAll('div[contenteditable=true]')) {
  // @ts-ignore
  el.addEventListener('keydown', performReadlineShortcuts)
}
