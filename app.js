function appInit(){
    var iframeReady = false;

    console.log("app init started");
    console.log("writing to iframe");

    var iframeWindow = document.getElementById('contentwindow-v9sdv907s9d0v').contentWindow;
    iframeWindow.document.open();
    // Adds code to iframe to alert us to console events. Obviously see iframe.js.
    iframeWindow.document.write(`<script>
        var source;
        // See https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
        window.addEventListener("message", (event) => {
            alert(["iframe: ", event.data].join(""));
            source = event.source;
            source.postMessage("pong");

            // handle console functions
            console.clear = () => source.postMessage("clear");
            console.log = (x) => source.postMessage(JSON.stringify(["log", x]));
            console.error = (x) => source.postMessage(JSON.stringify(["error", x]));
            console.debug = (x) => source.postMessage(JSON.stringify(["debug", x]));
            console.info = (x) => source.postMessage(JSON.stringify(["info", x]));
            console.warn = (x) => source.postMessage(JSON.stringify(["warn", x]));
        });

        // Handle JS errors
        window.onerror = (message, loc, lineno, colno, error) => console.error(["error at ", loc, " (", lineno, ",", colno, "): ", message].join(""));
    </script>`);
    iframeWindow.document.close();

    // setting up custom console
    console.log("setting up custom console");
    var myConsole = document.getElementById("console-2dgds709ga");
    console.clear = () => myConsole.innerHTML += `<span>Console Cleared</span><br>`;
    console.log = (x) => myConsole.innerHTML += `<span style="color: black">${x}</span><br>`;
    console.error = (x) => myConsole.innerHTML += `<span style="color: red"><b>Err</b> ${x}</span><br>`;
    console.debug = (x) => myConsole.innerHTML += `<span style="color: blue"><b>Debug</b> ${x}</span><br>`;
    console.info = (x) => myConsole.innerHTML += `<span style="color: green"><b>Info</b> ${x}</span><br>`;
    console.warn = (x) => myConsole.innerHTML += `<span style="color: pink"><b>Warn</b> ${x}</span><br>`;

    // listening for console messages from iframe
    window.addEventListener("message", (event) => {
        alert(`main: ${event.data}`);
        if (event.data = "clear"){ console.clear(); };
        if (event.data = "pong"){ iframeReady = true; console.log("Console is ready! Try me~"); };
        try {
            let data = JSON.parse(event.data);
        } catch {
            console.log(`JSON parse failed with message: ${event.data}`);
        }

        if (data[0] == "log"){ console.log(data[1]); }
        else if (data[0] == "error"){ console.error(data[1]); }
        else if (data[0] == "debug"){ console.debug(data[1]); }
        else if (data[0] == "info"){ console.info(data[1]); }
        else if (data[0] == "warn"){ console.warn(data[1]); }
        else { console.log(`Console "${data[0]}": "${data[1]}"`); };
    });

    // sending ping to iframe
    console.log("Pinging Iframe");
    setTimeout(iframeWindow.postMessage("ping"), 1000);
};

window.addEventListener("load", (event) => {appInit()});

// Handle JS errors (taken from iframe.js)
window.onerror = (message, source, lineno, colno, error) => {
    console.error(`error at ${source} (${lineno},${colno}): ${message}`);
};