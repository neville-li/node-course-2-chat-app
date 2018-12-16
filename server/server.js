const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);


io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("createMessage", (message) => {
        console.log("create Message",message);
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on("disconnect", () => {
        console.log("user was disconnected");
    });
});






server.listen(3000, (req, res) => {
    console.log("server started");
});