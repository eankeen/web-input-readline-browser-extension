const script = document.createElement('script')
script.src = chrome.extension.getURL('script.js')
;(document.head || document.documentElement).appendChild(script)
script.onload = (): Node | undefined => script?.parentNode?.removeChild(script)
