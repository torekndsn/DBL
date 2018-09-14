/////////////////////////////////////////////////////////
//Host the DBL webside
var express = require('express');
var fs = require('fs');
var app = express();
var server = app.listen(8000)
var cmd = require('node-cmd');
app.use(express.static('public'))
console.log("started server")

/////////////////////////////////////////////////////////
//Create socket connection between server and client
var socket = require('socket.io').listen(server);
//listen for data from client
socket.on('connection', function (socket) {
	socket.on('msg', function (data){
		console.log(data);
		socket.emit('msg', "Hello client");
	});
	socket.on('data', function (data){
		get_dbl_data(data);
	});
});
//send data to client

//When dbl data is revieved
var text = "";
var name = "";
var csv; 

// GET FILE COUNT IN FOLDER TO AVOID DUBLICATE
var number = 0;
function get_count_callback(num){
	number = num.toString();
	console.log(number);
}
fs.readdir("./output/", function(err, files){
	var num = files.length-2;
	get_count_callback(num);
});

function get_dbl_data(data){
	text = data.dbl;
	csv = data.csv;
	var html_template = "<style>@font-face{font-family: Avenir;src: url(fonts/AvenirLTStd-Medium.otf);}html body{margin:0px;}.outer-wrapper {margin: auto;width:529px; height:776px;padding: 32px;border:1px solid black;}.innter-wrapper{position: relative;height:100%;}h1{position: absolute;margin:0px;font-family: Avenir;font-size: 12px;color: black;}.question{left:0px;}.title{left:100%;width:100%;transform: rotate(90deg);-webkit-transform: rotate(90deg);transform-origin:0% 0%;-webkit-transform-origin: 0% 0%;}.name{right:0px;bottom: 0px;}.number{left:0px;bottom: 0px;}.dbl-content{position: absolute;width: 100%;height:100%;top:0;left:0;}p{font-family: Avenir;font-size: 16px;font-weight: 300;color: black;width:366px;position: relative;padding-top: 50%;padding-left: 100px;}</style><div class='outer-wrapper'><div class='innter-wrapper'><h1 class='question float_left'>QUESTION</h1><h1 class='title float_right'>DIGITAL BODY LANGUAGE</h1><h1 class='name float_left'>TORE KNUDSEN </h1><h1 class='number float_right'>#201</h1><div class='dbl-content'><p>"+text+"</p></div></div></div>"
	create_pdf(html_template);
	save_csv(csv);
}

/////////////////////////////////////////////////////////
//CONVERT HTML TO PDF
var pdf = require('html-pdf');
var file_name = "test" //name of the file
var options = {
	width:'595px', 
	height:'842px',
	orientation: 'portrait',
	type: 'pdf'
}

function create_pdf(html){
	console.log(number);
	pdf.create(html,options).toFile('./output/'+file_name+"_"+number+'.pdf', function(err,res){
		if (err) return console.log(err);
		if(res){
			console.log(res);
			cmd.run('say "hello there"');
		}
	});
}

function save_csv(csv){
	fs.writeFile('./output/'+file_name+"_"+number+'.csv', csv, 'utf8', function (err) {
  if (err) {
    console.log('Some error occured - file either not saved or corrupted file saved.');
  } else{
    console.log('It\'s saved!');
  }
});
}





