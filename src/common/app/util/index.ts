export * from './compute'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAlmostDeepestChildNode(el: any): any {
  if (el instanceof Text) {
    return el.parentNode
  } else if (el instanceof HTMLInputElement) {
    return el
  }
  return getAlmostDeepestChildNode(el.firstChild)
}

export function getStringStartEnd(
  this: EventTarget,
  ev: KeyboardEvent
): [string | null, number | null, number | null] {
  // contentEditableGetIt
  let contentEditableGetIt = (
    eventTarget: HTMLElement
  ): [string, number, number] => {
    const string = (eventTarget.firstChild as Text).wholeText

    let range = document.getSelection().getRangeAt(0)
    const start = range.startOffset
    const end = range.endOffset
    return [string, start, end]
  }

  if (this instanceof HTMLInputElement) {
    let eventTarget = ev.target as HTMLInputElement
    return [
      eventTarget.value,
      eventTarget.selectionStart,
      eventTarget.selectionEnd,
    ]
  } else if (this instanceof HTMLElement && this.isContentEditable) {
    let eventTarget = ev.target as HTMLElement

    if (eventTarget.firstChild instanceof Text) {
      return contentEditableGetIt(eventTarget)
    } else {
      let childTarget = getAlmostDeepestChildNode(eventTarget)

      if (!(childTarget instanceof HTMLElement))
        throw new Error('child target not html element')
      return contentEditableGetIt(childTarget as HTMLElement)
    }
  }
  return [null, null, null]
}

export function modifyTextCursorSelection(
  this: EventTarget,
  deepChild: Node,
  start: number,
  end: number
): void {
  if (deepChild instanceof HTMLInputElement) {
    let el = deepChild as HTMLInputElement
    el.setSelectionRange(start, end)
  } else if (deepChild instanceof HTMLElement && deepChild.isContentEditable) {
    let el = deepChild as HTMLElement
    let range = document.createRange()
    let selection = document.getSelection()

    range.setStart(el.firstChild, start)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
  } else {
    throw new Error(`deepChild not a predicted value: ${deepChild.toString()}`)
  }
}

// export function deleteTextCursorSelection(
//   this: EventTarget,
//   deepChild: Node,
//   string: string,
//   start: number,
//   end: number
// ): void {
//   // disabled for now
//   return

//   const newValue: string = string.slice(0, start) + string.slice(end)
//   if (deepChild instanceof HTMLInputElement) {
//     let el = deepChild as HTMLInputElement
//     el.value = newValue

//     modifyTextCursorSelection.call(this, deepChild, start, end)
//   } else if (
//     deepChild instanceof HTMLElement &&
//     (deepChild as HTMLElement).isContentEditable
//   ) {
//     let el = deepChild as HTMLElement
//     let textNode = el.firstChild as Text
//     textNode.data = newValue
//   } else {
//     throw new Error(`deepChild not a predicted value: ${deepChild.toString()}`)
//   }
// }
