function appInit(){
    alert("App init started");
    alert("writing document");
    var iframeWindow = document.getElementById('contentwindow-v9sdv907s9d0v').contentWindow;
    iframeWindow.document.open();

    // Adding code to iframe to alert us to console events.
    // See https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    iframeWindow.document.write(`<script>
        var bHPage;
        var bHOrigin;

        // listening to ping so we can save the source
        window.addEventListener("message", (event) => {
            if (!bHPage) bHPage = event.source;
            bHPage.postMessage("Signal recieved -- message content ignored");
        });

        // Console functions post to bHPage
        console.clear = function(x){bHPage.postMessage("clear")};
        console.log = function(x){bHPage.postMessage("log")};
        console.error = function(x){bHPage.postMessage("error")};
        console.debug = function(x){bHPage.postMessage("debug")};
        console.info = function(x){bHPage.postMessage("info")};
        console.warn = function(x){bHPage.postMessage("warn")};
    </script>`);

    iframeWindow.document.close();
    
    // sending ping to iframe
    alert("pinging iframe");
    iframeWindow.postMessage("Signaling this is the source document");

    // listening for console events
    window.addEventListener("message", (event) => {
        alert(event.data);
    });

    // adding the custom console
    /*
    var myConsole = document.getElementById("console");
    console.clear = function(x){myConsole.innerHTML += `<p>Console Cleared</p><br>`};
    console.log = function(x){myConsole.innerHTML += `<p style="color: black">LOG ${x}</p><br>`};
    console.error = function(x){myConsole.innerHTML += `<p style="color: red">ERR ${x}</p><br>`};
    console.debug = function(x){myConsole.innerHTML += `<p style="color: blue">DEBUG ${x}</p><br>`};
    console.info = function(x){myConsole.innerHTML += `<p style="color: green">INFO ${x}</p><br>`};
    console.warn = function(x){myConsole.innerHTML += `<p style="color: pink">WARN ${x}</p><br>`};
    */
}

window.addEventListener("load", (event) => {appInit()});