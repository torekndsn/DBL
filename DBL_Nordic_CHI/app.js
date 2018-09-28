//General imports
var express = require('express');
var fs = require('fs');
var app = express();
var server = app.listen(8000)

//Host the DBL fron-end
app.use(express.static('public'))
console.log("started server")

//Create socket connection between server and client
var socket = require('socket.io').listen(server);
//Store data from client
var file_name = '';
var text = "";
var name = "";
var question = ""; 
var number;
var csv; 
//listen for data from client
socket.on('connection', function (socket) {
	socket.on('msg', function (data){
		console.log(data);
		socket.emit('msg', "Hello client");
	});

	//When data recieved start the chain
	socket.on('data', function (data){
		//Get the number of files to generate a name
		fs.readdir("./output/", function(err, files){
			if(err) return err;
			else{
				var num = files.length-2;
				number = num.toString();
				file_name = "test_"+number;
				//When file name is generated, call function to create data
				get_dbl_data(data)	
			}
		});

		//Use data to create content for posters and csv 
		function get_dbl_data(data){
			text = data.dbl;
			csv = data.csv;
			name = data.name;
			question = data.question;
			var html_template = "<style>@font-face{font-family: Avenir;src: url(fonts/AvenirLTStd-Medium.otf);}html body{margin:0px;}.outer-wrapper {margin: auto;width:529px; height:776px;padding: 32px;}.innter-wrapper{position: relative;height:100%;}h1{position: absolute;margin:0px;font-family: Avenir;font-size: 12px;color: black;}.question{left:0px; max-width:50%;}.title{left:100%;width:100%;transform: rotate(90deg);-webkit-transform: rotate(90deg);transform-origin:0% 0%; -webkit-transform-origin: 0% 0%;}.name{left:0px;bottom: 0px;}.number{right:0px;bottom: 0px;}.dbl-content{ width: 100%; height: 100%; text-align: center; line-height: 30px;}.dbl-content:before{content: ' '; display: inline-block; vertical-align: middle; /* vertical alignment of the inline element */ height: 100%;}p{font-family: Avenir;font-size: 16px;font-weight: 300;color: black;width:366px;display: inline-block; vertical-align: middle; text-align: left;}</style><div class='outer-wrapper'><div class='innter-wrapper'><h1 class='question'>"+question.toUpperCase()+"</h1><h1 class='title'>DIGITAL BODY LANGUAGE</h1><h1 class='name'>"+name.toUpperCase()+"</h1><h1 class='number'>"+"#"+number+"</h1><div class='dbl-content'><p>"+text+"</p></div></div></div>"
			create_pdf(html_template);
			save_csv(csv);
		}
	})
});

//Convert to pdf
var pdf = require('html-pdf');
function create_pdf(html){
	var options = {
		width:'595px', 
		height:'842px',
		orientation: 'portrait',
		type: 'pdf'
	}
	//Create and save pdf file to folder
	console.log("file name: " + file_name);
	pdf.create(html,options).toFile('./output/'+file_name+".pdf", function(err,res){
		if (err) return console.log(err);
		if(res) print_pdf(res);		
	});
}

//Print pdf
var cmd = require('node-cmd');
function print_pdf(res){
	console.log(res);
	setTimeout(function(){
		cmd.run("lpr output/"+file_name+".pdf");
		console.log("printed");
	}, 3000);
}

//Save csv file to folder
function save_csv(csv){
	fs.writeFile('./output/csv/'+file_name+'.csv', csv, 'utf8', function (err) {
		if (err) console.log('Some error occured - file either not saved or corrupted file saved.');
		else console.log('It\'s saved!');
	});
}


