// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("Background got a message!", sender)
//     sendResponse({})
// })

// chrome.commands.onCommand.addListener((command: string) => {
//   console.log('Command:', command)
// })

var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};
