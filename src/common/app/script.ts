import {
  computeBackwardChar,
  computeBackwardWord,
  computeBeginningOfLine,
  computeEndOfLine,
  computeForwardChar,
  computeForwardWord,
  // deleteTextCursorSelection,
  getAlmostDeepestChildNode,
  getStringStartEnd,
  modifyTextCursorSelection,
} from './util'

let isDevSoft =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined

function performReadlineShortcuts(this: EventTarget, e: KeyboardEvent): void {
  const [string, start, end] = getStringStartEnd.call(this, e)
  let ev = e

  // if dom element not handled with our case, throw
  if (!string ?? !start ?? !end)
    throw new Error(
      "event listener attached, but we didn't get the required information to do shortcuts"
    )

  // do not do anything on highlight
  if (start !== end) return

  if (ev.ctrlKey && ev.code === 'KeyA') {
    ev.preventDefault()

    const newStart = computeBeginningOfLine()
    let deepChild: Node = getAlmostDeepestChildNode(ev.target)
    modifyTextCursorSelection.call(this, deepChild, newStart, newStart)
  }
  if (ev.ctrlKey && ev.code === 'KeyE') {
    ev.preventDefault()

    const newStart = computeEndOfLine(string)

    let deepChild: Node = getAlmostDeepestChildNode(this)
    modifyTextCursorSelection.call(this, deepChild, newStart, newStart)
  }

  if (ev.ctrlKey && ev.code === 'KeyF') {
    ev.preventDefault()

    const newStart = computeForwardChar(string, start)

    let deepChild: Node = getAlmostDeepestChildNode(this)
    modifyTextCursorSelection.call(this, deepChild, newStart, newStart)
  }

  if (ev.ctrlKey && ev.code === 'KeyB') {
    ev.preventDefault()

    const newStart = computeBackwardChar(string, start)

    let deepChild: Node = getAlmostDeepestChildNode(this)
    modifyTextCursorSelection.call(this, deepChild, newStart, newStart)
  }

  if (ev.altKey && ev.code === 'KeyF') {
    ev.preventDefault()

    const newStart = computeForwardWord(string, start)

    let deepChild: Node = getAlmostDeepestChildNode(this)

    modifyTextCursorSelection.call(this, deepChild, newStart, newStart)
  }

  if (ev.altKey && e.code === 'KeyB') {
    ev.preventDefault()

    const newStart = computeBackwardWord(string, start)

    let deepChild: Node = getAlmostDeepestChildNode(this)
    modifyTextCursorSelection.call(this, deepChild, newStart, newStart)
  }

  if (ev.altKey && ev.code === 'Backspace') {
    // TODO: amulate ctrl + backspace on alt + backspace
    // ev.preventDefault()
    // console.log('delt')
    // let newEv = new KeyboardEvent('keydown', {
    //   ctrlKey: true,
    //   key: 'Backspace',
    // })
    // let deepChild: Node = getAlmostDeepestChildNode(this)
    // console.log(this)
    // console.log(deepChild)
    // if (deepChild.firstChild) {
    // document.dispatchEvent(newEv)
    // }
    // const newStart = computeBackwardWord(string, start)
    // let deepChild: Node = getAlmostDeepestChildNode(this)
    // deleteTextCursorSelection.call(this, deepChild, string, newStart, start)
    // // after deleting text, we have to readjust the cursor
    // modifyTextCursorSelection.call(this, deepChild, newStart, newStart)
  }
}

function performReadlineShortcutsWrapper(
  this: EventTarget,
  ev: KeyboardEvent
): void {
  try {
    performReadlineShortcuts.call(this, ev)
  } catch (err) {
    if (isDevSoft) {
      console.error('WEB INPUT READLINE: ERROR:', err)
    }
  }
}

for (let el of document.querySelectorAll('input')) {
  el.addEventListener('keydown', performReadlineShortcutsWrapper)
}

for (let el of document.querySelectorAll('div[contenteditable=true]')) {
  // @ts-ignore
  el.addEventListener('keydown', performReadlineShortcutsWrapper)
}

setInterval(() => {
  if (isDevSoft) {
    console.log('WEB INPUT READLINE: readded listeners')
  }
  for (let el of document.querySelectorAll('div[contenteditable=true]')) {
    // @ts-ignore
    el.addEventListener('keydown', performReadlineShortcutsWrapper)
  }
}, 3000)

document.addEventListener('keydown', function (ev: KeyboardEvent): void {
  console.log(this)
  console.log(ev)
})
