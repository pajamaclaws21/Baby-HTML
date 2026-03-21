function isTypable(x){
    let alphabet = "qwertyuiopasdfghjklzxcvbnm";
    let numbers = "1234567890";
    let special = "`~!@#$%^&*()-_=+[{]}\|;:',./?"
    return (special.includes(x) || numbers.includes(x) || alphabet.includes(x) || x == '"');
}

window.addEventListener("keydown", (event) => {
    var key = event.key;
    var listeningForTag = false;
    var tagName = "";

    var input = document.getElementById("text-12949124a09s70a");

    if (key == "<" && !(listeningForTag)) {
        listeningForTag = true;
    } else if (listeningForTag && isTypable(key)) {
        tagName += key.toString();
    } else if (key == ">" && listeningForTag) {
        listeningForTag = false;

        // from https://bennadel.com/4086
        var code = input.value;
        var cursorPosition = input.selectionEnd;
        // where cursor will be after paste
        var finalPosition = (cursorPosition + tagName.length + 3);
        // textarea value is equal to the code up to cursor + tag + code after cursor
        input.value = code.splice(0, cursorPos) + `</${tagName}>` + code.slice(cursorPos);
        // move cursor
        input.selectionStart = finalPosition;
        input.selectionEnd = finalPosition;
    } else if (key == "Backspace") {
        if (tagName.length > 1){
            tagName = tagName.substring(0, tagName.length - 1);
        } else {
            tagName = "";
            listeningForTag = false;
        }
    };
});