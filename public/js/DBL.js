

function DBL(){
	// Font color
	//Variables 

	
	var words = [];

	var currentMillis = 0;
	var timeData = 0;
	
	var lastKeyHit = 0;
	var lastWordLength = 0;
	var previousKey ="";
	var inputText; 

	var lastWord = "";
	var fontSize = 16; 

	var totalSpeed = 0;
	var keyCount = 0; 
	var topTime = 0; 
	var thisKey;


	var deletedWordsCount = 0; 
	var spacing;
	var tracking = 0; 
	var color = 90;
	var jumpWord = false; 
	var lastJumpWord; 

	var dec = 2; 
	var lineShift = false;


	///////////////////  START NEW LOOP WHEN KEY IS PRESSED  ///////////////////
	$("#inputText").keydown(function( event ){
	   // if (event.which !== 0 && !event.ctrlKey && !event.metaKey && !event.altKey){  

		thisKey = event.key;
		//console.clear(); 
	 	currentMillis = event.timeStamp;
		// get input text and get every word into array. 
		inputText = this.value;
		words = inputText.replace( /\n/g, " " ).split( " " )
		//console.log("words length: " + words.length);
		//console.log("values length " + values.length);

		//reset time if nothing has been typed
		if(inputText.length <=  0) lastKeyHit = currentMillis;

		//if something has been typed, record keystroke timestamps.
		if(inputText.length > 0) timeData = currentMillis - lastKeyHit;
		
	

		// S P A C I N G // - if break between words, get time interval to spacing
		if(previousKey == " " || thisKey == " "){
			spacing = word_spacing(timeData);
			if( words.length > 1 && previousKey == " " && values[values.length-1].spacing == 0){
				values[values.length-1].spacing = spacing;
			}
		}
		else spacing = 0; 

		// D E L E T I N G   R U L E // - if words are delted, it chould affect font-size of next word
	
		if(thisKey == 'Backspace' && words.length < lastWordLength) deletedWordsCount++; 
		 


		/* if(event.key == 'Enter') lineShift = true;
		else lineShift = false;
		console.log("lineshift: " + lineShift);
		*/ 

	
		// E N D   R E C O R D - if space is hit, a word is done. 
		if(thisKey == " " || thisKey == 'Enter' && words.length > 0){
			//console.log("record is off");
			if(!jumpWord) fontSize = word_size(deletedWordsCount);

		 	if(keyCount > 1 )tracking = typingSpeed(totalSpeed, keyCount);
			else tracking = 0; 
			if(words.length == 1) tracking = 0;	 //temporary fix for the first word

			lastWord = words[words.length-1];

			if(thisKey == 'Enter') {
				console.log("I pressed enter");
			//	lastWord += '\n';
			}
			console.log("last Word: " + lastWord);

			//if(lineShift) lastWord = lastWord + "\n"; 
			values.push({word: String(lastWord), spacing: +spacing.toFixed(dec), size: +fontSize.toFixed(0), tracking: +tracking.toFixed(dec), color: +color.toFixed(0) });
			//reset 
			deletedWordsCount = 0;
			jumpWord = false; 
			totalSpeed = 0;
			keyCount = 0; 
			topTime = 0;
			//fontSize = 16;
		}

		// T R A C K I N G   A N D   P A U S E   C O L O R
		else{
			if(thisKey != 'Backspace' && inputText.length > 1){
				//console.log("record is on");

				totalSpeed += timeData;
				keyCount++;

				if(timeData > topTime){
					 topTime = timeData;
				     color = pauseColor(topTime);
				 }
			}
		}

	
		// D E L E T E    W O R D S   F R O M    A R R A Y - if words have been deleted, remove from array. 
		while(values.length > words.length) values.splice(values.length-1, 1);
		var currentWord = values[values.length-1].word;
		if(lastWord != currentWord) values[values.length-1].word = lastWord; 


		// F I X   D E L E T E   W O R D   B U G - When lastword is not " " after deleting, wrong word is enlarged	 
		if(thisKey == " " && lastWordLength > words.length ){
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

 		// update 
		lastJumpWord = jumpWord;
		previousKey = thisKey; 
 		lastWordLength = words.length; 
 		lastKeyHit = event.timeStamp;
 	//	}
	})

	
	$('#render').click(function(){ 
		if(values.length > 0){	
		words = inputText.split(" ");
     	renderText(words[words.length-1], thisKey);
    	 }
   	 });



	$('#send').click(function(){
	if(values.length > 0){	
		words = inputText.split(" ");
		renderChat(words[words.length-1], thisKey, values);

			$('.textBox').val('');
			inputText = "";
			deletedWordsCount = 0;
			jumpWord = false; 
			totalSpeed = 0;
			keyCount = 0; 
			topTime = 0;
			//fontSize = 16;
			thisKey="";
			deletedWordsCount = 0;
			jumpWord = false; 
			totalSpeed = 0;
			keyCount = 0; 
			topTime = 0;
			values = [];
		}
	});



	
}