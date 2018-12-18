var socket = io();

socket.on("connect", function() {
    console.log("connected to server");
});

socket.on("disconnect", function() {
    console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {
    console.log("newMessage", message);
    var li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    $("#message").append(li);
});

// socket.emit("createMessage", {
//     from: "Frank",
//     text: "Hi"
// }, function(data) {
//     console.log(data);
// });

$("#message-form").on("submit", function(e) {
    e.preventDefault();
    socket.emit("createMessage", {
        from: "User",
        text: $(`[name=message]`).val()
    }, function (){

    });
});