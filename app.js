function appInit(){
    console.log("app init started");
    console.log("writing to iframe");

    var iframeWindow = document.getElementById('contentwindow-v9sdv907s9d0v').contentWindow;
    iframeWindow.document.open();
    // Adds code to iframe to alert us to console events. Obviously see iframe.js.
    iframeWindow.document.write("<script src='https://pajamaclaws.net/Baby-HTML/iframe.js'></script>");
    iframeWindow.document.close();

    // sending ping to iframe
    console.log("pinging iframe");
    iframeWindow.postMessage("Signaling this is the source document");

    // setting up custom console
    console.log("setting up custom console");
    var myConsole = document.getElementById("console-2dgds709ga");
    console.clear = function(x){myConsole.innerHTML += `<p>Console Cleared</p><br>`};
    console.log = function(x){myConsole.innerHTML += `<p style="color: black">Log ${x}</p><br>`};
    console.error = function(x){myConsole.innerHTML += `<p style="color: red">Err ${x}</p><br>`};
    console.debug = function(x){myConsole.innerHTML += `<p style="color: blue">Debug ${x}</p><br>`};
    console.info = function(x){myConsole.innerHTML += `<p style="color: green">Info ${x}</p><br>`};
    console.warn = function(x){myConsole.innerHTML += `<p style="color: pink">Warn ${x}</p><br>`};

    // listening for console messages from iframe
    console.log("Console is ready! Try me~");
    window.addEventListener("message", (event) => {
        if (event.data = "clear") console.clear();
        try {
            let data = JSON.parse(event.data);
            if (data[0] == "log") console.log(data[1]) 
            else if (data[0] == "error") console.error(data[1])
            else if (data[0] == "debug") console.debug(data[1])
            else if (data[0] == "info") console.info(data[1])
            else if (data[0] == "warn") console.warn(data[1])
            else console.log(`Console method ${data[0]} called with message: ${data[1]}`);
        } catch {
            console.log(`JSON parse failed with message: ${event.data}`);
        }
    });
};

window.addEventListener("load", (event) => {appInit()});