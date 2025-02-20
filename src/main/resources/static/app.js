function submitForm() {
    fetch("/", {
            method: "POST",
            body: JSON.stringify({name: nameInput.value, msg: msgInput.value, replyTo: replyToInput.value})
        }
    ).then(response => response.json())
        .then(json => {
            if (json["success"]) msgInput.value = ""
            errorDiv.innerText = json["err"]
        })
    return false;
}


var socket = new WebSocket("ws://" + location.host + "/subscribe");
socket.onmessage = function (ev) {
    messageList.innerHTML = ev.data
}

function submitFilter() {
    socket.send(filterInput.value);
    return false;
}