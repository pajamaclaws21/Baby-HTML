var bHPage;
var bHOrigin;

// See https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
window.addEventListener("message", (event) => {
    if (!bHPage) bHPage = event.source;
    bHPage.postMessage("Ping recieved by iframe!");
});

// Console functions post to bHPage
console.clear = function(x){bHPage.postMessage("clear")};
console.log = function(x){bHPage.postMessage(JSON.stringify(["log", "x"]))};
console.error = function(x){bHPage.postMessage(JSON.stringify(["error", "x"]))};
console.debug = function(x){bHPage.postMessage(JSON.stringify(["debug", "x"]))};
console.info = function(x){bHPage.postMessage(JSON.stringify(["info", "x"]))};
console.warn = function(x){bHPage.postMessage(JSON.stringify(["warn", "x"]))};

// Handle JS errors
window.onerror = (message, source, lineno, colno, error) => {
    console.error(`error at ${source} (${lineno},${colno}): ${message}`);
};