function appInit(){
    console.log("App init started");
    alert("App init started");

    var iframeWindow = document.getElementById('contentwindow-v9sdv907s9d0v').contentWindow;
    iframeWindow.document.open();

    // Adding code to iframe to alert us to console events.
    // See https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    iframeWindow.document.write(`<script>
        var bHPage;
        var bHOrigin;

        // listening to ping so we can save the source
        window.addEventListener("message", (event) => {
        if (event.origin != "https://pajamaclaws.net/Baby-HTML") return;
        if (!bHPage) bHPage = event.source;
        if (!bHOrigin) bHOrigin = event.origin;
        bHPage.postMessage("Signal recieved -- message content ignored", bHOrigin);
        });

        // Console functions post to bHPage
        console.clear = function(x){bHPage.postMessage("clear", bHOrigin)};
        console.log = function(x){bHPage.postMessage("log", bHOrigin)};
        console.error = function(x){bHPage.postMessage("error", bHOrigin)};
        console.debug = function(x){bHPage.postMessage("debug", bHOrigin)};
        console.info = function(x){bHPage.postMessage("info", bHOrigin)};
        console.warn = function(x){bHPage.postMessage("warn", bHOrigin)};
    </script>`);

    iframeWindow.document.close();
    // sending ping to iframe
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
export { appInit };