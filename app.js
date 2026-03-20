function appInit(){
    console.log("app init started");
    console.log("writing to iframe");

    var iframeWindow = document.getElementById('contentwindow-v9sdv907s9d0v').contentWindow;
    iframeWindow.document.open();
    // Adds code to iframe to alert us to console events. Obviously see iframe.js.
    iframeWindow.document.write("<script src='https://pajamaclaws.net/babyhtml/iframe.js'></script>");
    iframeWindow.document.close();

    // sending ping to iframe
    console.log("pinging iframe");
    iframeWindow.postMessage("Signaling this is the source document");

    // setting up custom console
    console.log("setting up custom console");
    var myConsole = document.getElementById("console-2dgds709ga");
    console.clear = function(x){myConsole.innerHTML += `<span>Console Cleared</span><br>`};
    console.log = function(x){myConsole.innerHTML += `<span style="color: black">${x}</span><br>`};
    console.error = function(x){myConsole.innerHTML += `<span style="color: red"><b>Err</b> ${x}</span><br>`};
    console.debug = function(x){myConsole.innerHTML += `<span style="color: blue"><b>Debug</b> ${x}</span><br>`};
    console.info = function(x){myConsole.innerHTML += `<span style="color: green"><b>Info</b> ${x}</span><br>`};
    console.warn = function(x){myConsole.innerHTML += `<span style="color: pink"><b>Warn</b> ${x}</span><br>`};

    // listening for console messages from iframe
    window.addEventListener("message", (event) => {
        if (event.data = "clear") console.clear();
        if (event.data = "console ready") console.log("Console is ready! Try me~");
        try {
            let data = JSON.parse(event.data);
        } catch {
            console.log(`JSON parse failed with message: ${event.data}`);
        }

        if (data[0] == "log") console.log(data[1]) 
        else if (data[0] == "error") console.error(data[1])
        else if (data[0] == "debug") console.debug(data[1])
        else if (data[0] == "info") console.info(data[1])
        else if (data[0] == "warn") console.warn(data[1])
        else console.log(`Console "${data[0]}": "${data[1]}"`);
    });
};

window.addEventListener("load", (event) => {appInit()});

// Handle JS errors (taken from iframe.js)
window.onerror = (message, source, lineno, colno, error) => {
    console.error(`error at ${source} (${lineno},${colno}): ${message}`);
};