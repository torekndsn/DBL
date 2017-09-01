
var express = require('express');
var app = express(); 

var server = app.listen(process.env.PORT || 3000);
console.log("My socket server is running");

function listen(){
	var host = server.adress().adress;
	var port = server.adress().port;
	console.log( "Listening at http://" + host + ':' + port);
}

app.use(express.static('public'));


//web socket
var io = require('socket.io')(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log("New connection: " + socket.id);
	socket.on('messeage', inMsg);

	 function inMsg(data){
		socket.broadcast.emit('messeage', data);
		console.log(data);
	} 
}
