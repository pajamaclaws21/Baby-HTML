var source;

// See https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
window.addEventListener("message", (event) => {
    source = event.source;
    source.postMessage("console ready");

    // handle console functions
    console.clear = () => source.postMessage("clear");
    console.log = (x) => source.postMessage(JSON.stringify(["log", x]));
    console.error = (x) => source.postMessage(JSON.stringify(["error", x]));
    console.debug = (x) => source.postMessage(JSON.stringify(["debug", x]));
    console.info = (x) => source.postMessage(JSON.stringify(["info", x]));
    console.warn = (x) => source.postMessage(JSON.stringify(["warn", x]));
});

// Handle JS errors
window.onerror = (message, loc, lineno, colno, error) => console.error(`error at ${loc} (${lineno},${colno}): ${message}`);