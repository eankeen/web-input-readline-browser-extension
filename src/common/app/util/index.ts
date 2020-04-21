export * from './compute'

export function getStringStartEnd(
  this: EventTarget,
  e: KeyboardEvent
): [string | null, number | null, number | null] {
  if (this instanceof HTMLInputElement) {
    let eventTarget = e.target as HTMLInputElement
    return [
      eventTarget.value,
      eventTarget.selectionStart,
      eventTarget.selectionEnd,
    ]
  } else if (this instanceof HTMLElement && this.isContentEditable) {
    let eventTarget = e.target as HTMLDivElement

    if (!(eventTarget.firstChild instanceof Text)) return [null, null, null]
    const string = (eventTarget.firstChild as Text).wholeText

    let range = document.getSelection().getRangeAt(0)
    const start = range.startOffset
    const end = range.endOffset
    return [string, start, end]
  }
  return [null, null, null]
}

export function modifyTextCursorSelection(
  this: EventTarget,
  start: number,
  end: number
): void {
  if (this instanceof HTMLInputElement) {
    let el = this as HTMLInputElement
    el.setSelectionRange(start, end)
  } else if (this instanceof HTMLElement && this.isContentEditable) {
    let el = this as HTMLElement
    let range = document.createRange()
    let selection = document.getSelection()
    range.setStart(el.firstChild, start)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

export function deleteTextCursorSelection(
  this: EventTarget,
  string: string,
  start: number,
  end: number
): void {
  const newValue: string = string.slice(0, start) + string.slice(end)
  if (this instanceof HTMLInputElement) {
    let el = this as HTMLInputElement
    el.value = newValue

    modifyTextCursorSelection.call(this, start, end)
  } else if (this instanceof HTMLElement && this.isContentEditable) {
    let el = this as HTMLElement
    if (el.childNodes.length === 1 && el.firstChild instanceof Text) {
      let textNode = el.firstChild as Text
      textNode.data = newValue
    }
  }
}
