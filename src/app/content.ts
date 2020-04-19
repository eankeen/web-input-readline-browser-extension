// chrome.runtime.sendMessage({}, (response) => {
//   let checkReady = setInterval(() => {
//     if (document.readyState === 'complete') {
//       clearInterval(checkReady)

//       console.log('injected')
//     }
//   }, 100)
// })

const script = document.createElement('script')
script.src = chrome.extension.getURL('script.js')
;(document.head || document.documentElement).appendChild(script)
script.onload = (): Node | undefined => script?.parentNode?.removeChild(script)
