'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'public/index.html');

const server = express()
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
	console.log('Client connected');
	socket.on('disconnect', () => console.log('Client disconnected'));

	console.log("New connection: " + socket.id);
	socket.on('messeage', inMsg);

	function inMsg(data){
		socket.broadcast.emit('messeage', data);
		console.log(data);
	} 
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
//web socket

/*io.on('connection', (socket) => {
	console.log("New connection: " + socket.id);
	socket.on('messeage', inMsg);

	function inMsg(data){
		socket.broadcast.emit('messeage', data);
		console.log(data);
	} 
});*/