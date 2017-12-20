var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');
var robot = require("robotjs");

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendfile(__dirname + 'public/index.html');
});

io.on('connection', function (socket) {
    socket.on('mouseMove', function (data) {
        robot.moveMouse(data.mouseX, data.mouseY);
    });
    socket.on('mouseClick', function (data) {
        console.log(data);
        robot.mouseClick();
    });
});

var port = process.env.PORT || 9999;
server.listen(port, function () {
    console.log("Server is running on port: " + port);
});