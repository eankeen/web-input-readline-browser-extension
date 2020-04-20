const script = document.createElement('script')
script.src =
  chrome?.runtime?.getURL('script.js') || chrome.extension.getURL('script.js')
;(document.head || document.documentElement).appendChild(script)
script.onload = (): Node | undefined => script?.parentNode?.removeChild(script)
