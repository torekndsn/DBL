

function DBL(){
	// i made a NEW change!! 
	//Variables 

	var values = [];
	var words = [];

	var currentMillis = 0;
	var timeData = 0;
	
	var lastKeyHit = 0;
	var lastWordLength = 0;
	var previousKey;

	var lastWord = "";
	var lastWordMeta = "";
	var fontSize; 


	var deletedWordsCount = 0; 
	var spacing;


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
		
		// S T A R T  R E C O R D - if text has expanded, a new word is written.
		if(words.length > lastWordLength || previousKey == " "){

		}







		// S P A C I N G // - if break between words, get time interval to spacing
		if(previousKey == " " || event.key == " "){
			spacing = word_spacing(timeData);
			if(previousKey == " " && values[values.length-1].spacing == 0){
				values[values.length-1].spacing = spacing;
			}
		}
		else spacing = 0; 

		// D E L E T I N G // - if words are delted, it chould affect font-size of next word
		if( words.length < lastWordLength) deletedWordsCount++; 
		//console.log("deletedWordsCount: " + deletedWordsCount);



		//get last word for meta information
		lastWordMeta = words[words.length-1];
			
		// E N D   R E C O R D - if space is hit, a word is done. 
		if(event.key == " " && words.length > 0){

			fontSize = word_size(deletedWordsCount);
		//	console.log("Calculated font size: " + fontSize);

			lastWord = words[words.length-1];
			values.push({word: lastWord, spacing: spacing, size: fontSize });

			//reset 
			deletedWordsCount = 0;
		}
	
		// D E L E T E    W O R D S   F R O M    A R R A Y - if words have been deleted, remove from array. 

		while(values.length > words.length) values.splice(values.length-1, 1);
		var currentWord = values[values.length-1].word;
		if(lastWord != currentWord) values[values.length-1].word = lastWord; 

		console.log("words: " + words);
		console.log("last word: " + lastWordMeta);
		console.log("previous key: " + previousKey);
		console.log("last word length: " + lastWordLength);

		//Recover fontSize for deleted words

		 values[values.length-1].size = fontSize;
		
	 
		







		// A P P L Y I N G   S T Y L E 

		$("#outputText").empty();
 			jQuery.each(values, function(i, v) { 	

			 	var w = values[i].word;
			 	var spacing_ = values[i].spacing;
			 	var size_ = values[i].size;
	
			 	var newStyle = "<span " + 
				"style=\"padding-right:" + spacing_ +"px" + 
				";font-size:" + size_ + "px" +
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

 



		previousKey = event.key; 
 		lastWordLength = words.length; 
 		lastKeyHit = event.timeStamp;

	})
}