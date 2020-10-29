const express = require("express");
const server = express();

server
.use(express.static("public"))
.get("/", (req, res) => {
    res.sendFile(__dirname + "/view/index.html")
})
.listen(2200)