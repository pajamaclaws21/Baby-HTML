var tagName;
var listeningForTag = false;
var input = document.getElementById("text-12949124a09s70a");

function isTypable(x){
    let alphabet = "qwertyuiopasdfghjklzxcvbnm";
    let numbers = "1234567890";
    let special = "`~!@#$%^&*()-_=+[{]}\|;:',./?"
    return (special.includes(x) || numbers.includes(x) || alphabet.includes(x) || x == '"');
}

function insertString(x){
    // from https://bennadel.com/4086
    var code = input.value;
    var cursorPosition = input.selectionEnd;
    // where cursor will be after paste
    var finalPosition = (cursorPosition + x.length);
    // textarea value is equal to the code up to cursor + tag + code after cursor
    input.value = code.slice(0, cursorPosition) + x + code.slice(cursorPosition);
    // move cursor
    input.selectionStart = finalPosition;
    input.selectionEnd = finalPosition;
}

window.addEventListener("keydown", (event) => {
    var key = event.key;
    if (key == "<" && !(listeningForTag)) {
        tagName = "";
        listeningForTag = true;
    } else if (isTypable(key) && listeningForTag) {
        tagName += key.toString();
    } else if (key == ">" && listeningForTag) {
        listeningForTag = false;
        insertString(`></${tagName}`);
    } else if (key == "Backspace" && listeningForTag) {
        if (tagName.length > 1){
            tagName = tagName.substring(0, tagName.length - 1);
        } else {
            tagName = "";
            listeningForTag = false;
        }
    } else if (key == "Tab") {
        insertString("    ");
        input.focus();
    };
});

window.addEventListener("load", (event) => {
    input.value = `
<!DOCTYPE html>
<html>
    <head>
        <title>My Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta charset="utf-8">
        <style>
        </style>
    </head>
    <body>
        <h1>My Page</h1>
    </body>
</html>
    `;
});