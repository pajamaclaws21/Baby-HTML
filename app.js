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
            //alert(["iframe recieved: ", event.data].join(""));

            source = event.source;
            if (event.data == "ping") {
                source.postMessage("pong");
            };

            // handle console functions
            console.clear = () => source.postMessage("clear");
            console.log = (x) => source.postMessage(JSON.stringify(["log", "<b>iframe</b> " + x]));
            console.error = (x) => source.postMessage(JSON.stringify(["error", "<b>iframe</b> " + x]));
            console.debug = (x) => source.postMessage(JSON.stringify(["debug", "<b>iframe</b> " + x]));
            console.info = (x) => source.postMessage(JSON.stringify(["info", "<b>iframe</b> " + x]));
            console.warn = (x) => source.postMessage(JSON.stringify(["warn", "<b>iframe</b> " + x]));
        });

        // Handle JS errors
        window.onerror = (message, loc, lineno, colno, error) => console.error(["error at ", loc, " (", lineno, ",", colno, "): ", message].join(""));
    </script>`);
    iframeWindow.document.close();

    // setting up custom console
    console.log("setting up custom console");
    var myConsole = document.getElementById("console-2dgds709ga");
    console.clear = () => myConsole.innerHTML = "<span>Console cleared</span><br>";
    console.log = (x) => myConsole.innerHTML = `<span style="color: black">${x}</span><br>` + myConsole.innerHTML;
    console.error = (x) => myConsole.innerHTML = `<span style="color: red"><em>Err</em> ${x}</span><br>` + myConsole.innerHTML;
    console.debug = (x) => myConsole.innerHTML = `<span style="color: blue"><em>Debug</em> ${x}</span><br>` + myConsole.innerHTML;
    console.info = (x) => myConsole.innerHTML = `<span style="color: green"><em>Info</em> ${x}</span><br>` + myConsole.innerHTML;
    console.warn = (x) => myConsole.innerHTML = `<span style="color: pink"><em>Warn</em> ${x}</span><br>` + myConsole.innerHTML;

    // listening for console messages from iframe
    window.addEventListener("message", (event) => {
        //alert(`main recieved: ${event.data}`);
        if (event.data == "clear") {
            console.clear(); 
        } else if (event.data == "pong") {
            //alert("pong recieved");
            iframeReady = true;
            console.clear();
            console.log("Console is ready! Try me~");
        } else {
            try {
                let data = JSON.parse(event.data);
                if (data[0] == "log"){ console.log(data[1]); }
                else if (data[0] == "error"){ console.error(data[1]); }
                else if (data[0] == "debug"){ console.debug(data[1]); }
                else if (data[0] == "info"){ console.info(data[1]); }
                else if (data[0] == "warn"){ console.warn(data[1]); }
                else { console.log(`Console "${data[0]}": "${data[1]}"`); };
            } catch {
                console.log(`JSON parse failed with message: ${event.data}`);
            }
        };
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