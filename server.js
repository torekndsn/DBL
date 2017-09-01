
var express = require('express');
var socketIO = require('socket.io');
var PORT = process.env.PORT || 3000;

const server = express()
	.use(express.static('public'))
	.listen(PORT, () => console.log('Listening on ' + PORT));

const io = socketIO(server);
console.log("My socket server is running");


//web socket

io.sockets.on('connection', (socket) => {
	console.log("New connection: " + socket.id);
	socket.on('messeage', inMsg);

	function inMsg(data){
		socket.broadcast.emit('messeage', data);
		console.log(data);
	} 
});