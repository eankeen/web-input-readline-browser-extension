// chrome.runtime.sendMessage({}, (response) => {
//   let checkReady = setInterval(() => {
//     if (document.readyState === 'complete') {
//       clearInterval(checkReady)

//       console.log('injected')
//     }
//   }, 100)
// })

var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};
