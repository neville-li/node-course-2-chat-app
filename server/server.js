const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");


const {
    generateMessage,
    generateLocationMessage
} = require("./utils/message");
const app = express();
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
//execute the functions below when a client joins
io.on("connection", (socket) => {
    console.log("New user connected");

    //Emit a message the joining client
    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));

    //broadcast message to other clients except for the joining client
    socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));

    socket.on("createMessage", (message, callback) => {
        console.log("create Message", message);

        //broadcast to every to every connection(clients and servers) including the request sender
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback("This is from this server");

    });

    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
    });


    socket.on("disconnect", () => {
        console.log("user was disconnected");
    });
});






server.listen(port, () => {
    console.log("server started " + port);
});