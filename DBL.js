

function DBL(){
	// Font color
	//Variables 

	var values = [];
	var words = [];

	var currentMillis = 0;
	var timeData = 0;
	
	var lastKeyHit = 0;
	var lastWordLength = 0;
	var previousKey;

	var lastWord = "";
	var fontSize; 

	var totalSpeed = 0;
	var keyCount = 0; 


	var deletedWordsCount = 0; 
	var spacing;
	var tracking = 0; 
	var jumpWord = false; 
	var lastJumpWord; 


///////////////////  START NEW LOOP WHEN KEY IS PRESSED  ///////////////////
	$("#inputText").keydown(function( event ){
		console.clear(); 
	 	currentMillis = event.timeStamp;
		// get input text and get every word into array. 
		var inputText = this.value;
		words = inputText.split(" ");

		//reset time if nothing has been typed
		if(inputText.length <=  0) lastKeyHit = currentMillis;

		//if something has been typed, record keystroke timestamps.
		if(inputText.length > 0) timeData = currentMillis - lastKeyHit;
		
	


		// S P A C I N G // - if break between words, get time interval to spacing
		if(previousKey == " " || event.key == " "){
			spacing = word_spacing(timeData);
			if(previousKey == " " && values[values.length-1].spacing == 0){
				values[values.length-1].spacing = spacing;
			}
		}
		else spacing = 0; 

		// D E L E T I N G   R U L E // - if words are delted, it chould affect font-size of next word
		if( words.length < lastWordLength) deletedWordsCount++; 



	
		// E N D   R E C O R D - if space is hit, a word is done. 
		if(event.key == " " && words.length > 0){
			console.log("false");

			if(!jumpWord) fontSize = word_size(deletedWordsCount);

		 	if(keyCount > 1 )tracking = typingSpeed(totalSpeed, keyCount);
			else tracking = 0;
			console.log("avrSpeed: " + totalSpeed / keyCount);

			lastWord = words[words.length-1];
			values.push({word: lastWord, spacing: spacing, size: fontSize, tracking: tracking });

			//reset 
			deletedWordsCount = 0;
			jumpWord = false; 
			totalSpeed = 0;
			keyCount = 0; 
		}

		// T R A C K I N G 
		else{
			if(event.key != 'Backspace' && inputText.length > 1){
				console.log("tracking record");

				totalSpeed += timeData;
				keyCount++;

				//console.log("time data " + timeData);
				//console.log("keyCount: " + keyCount);

			}
		}
	
		// D E L E T E    W O R D S   F R O M    A R R A Y - if words have been deleted, remove from array. 
		while(values.length > words.length) values.splice(values.length-1, 1);
		var currentWord = values[values.length-1].word;
		if(lastWord != currentWord) values[values.length-1].word = lastWord; 




		// F I X   D E L E T E   W O R D   B U G - When lastword is not " " after deleting, wrong word is enlarged	 
		if(event.key == " " && lastWordLength > words.length ){
			jumpWord = true;
		}
		 else{
		 	if(values[values.length-1].size <= 16)
			values[values.length-1].size = fontSize;
		}
		if(jumpWord == false && lastJumpWord == true){
			values[values.length-1].size = fontSize;		
		}
		if(jumpWord) values[values.length-1].size = 16;

			

		// A P P L Y I N G   S T Y L E 

		$("#outputText").empty();
 			jQuery.each(values, function(i, v) { 	

			 	var w = values[i].word;
			 	var spacing_ = values[i].spacing;
			 	var size_ = values[i].size;
			 	var tracking_ = values[i].tracking;
	
			 	var newStyle = "<span " + 
				"style=\"padding-right:" + spacing_ +"px" + 
				";font-size:" + size_ + "px" + 
				";letter-spacing:" + tracking_ + "px" +
				";\">";
			//	console.log(newStyle + w + " " + "</span>");	
				$("#outputText").append( $(newStyle + w + " " + "</span>"));
			});

 		/* 	var newStyle = "<span " + 
				"style=\"color:" + newCol +
				";word-spacing:" + spacing_ +"px" + 
				";font-size:" + size + "px" +
				";letter-spacing:" + tracking_ + "px" +
				";\">";
		*/ 

 


		lastJumpWord = jumpWord;
		previousKey = event.key; 
 		lastWordLength = words.length; 
 		lastKeyHit = event.timeStamp;

	})
}