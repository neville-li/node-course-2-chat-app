const path = require("path");
const express = require("express");
const app = express();

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.send("welcome to the chat app");
});

app.listen(3000, (req, res) => {
    console.log("server started");
});