

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

	var tempFontSize = 0;
	var lastWord = "";

	var totalSpeed = 0;
	var keyCount = 0; 
	var topTime = 0; 
	var thisKey;


	var deletedWordsCount = 0; 
	var spacing;
	var tracking = 0; 
	var color = 0;
	var jumpWord = false; 
	var lastJumpWord; 

	var dec = 2; 
	var lineShift = false;
	var isRendered = false;
	var minimumInput = false;
	var animationTrigge = false;
	var rules_on = false;
	var rule_toggle = true;

	///////////////////  START NEW LOOP WHEN KEY IS PRESSED  ///////////////////
	$("#inputText").keydown(function( event ){
		thisKey = event.key;
		//console.log("choosedQuestion state: ") + choosedQuestion
		if(thisKey == 'ArrowLeft' || thisKey =='ArrowRight' ) console.log("it was");
		else if (!animationTrigge){
			console.log("only once");
			choosedQuestion = true;
			$(".instructions").fadeOut('slow','linear', function(){
				$(".indication").fadeIn('slow','linear', function(){
					animationTrigge = true;
				});
			});
		}		//console.clear(); 
	 	currentMillis = event.timeStamp;
		// get input text and get every word into array. 
		inputText = this.value;
		//console.log("inputText length: " + inputText.length);
		words = inputText.replace( /\n/g, " " ).split( " " )

		//reset time if nothing has been typed
		if(inputText.length <=  0){
			lastKeyHit = currentMillis;
		}
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

		// E N D   R E C O R D - if space is hit, a word is done. 
		if(thisKey == " " || thisKey == 'Enter' && words.length > 0){
			//console.log("record is off");
			if(!jumpWord) tempFontSize = word_size(deletedWordsCount);

		 	if(keyCount > 1 )tracking = typingSpeed(totalSpeed, keyCount);
			else tracking = 0; 
			if(words.length == 1) tracking = 0;	 //temporary fix for the first word

			lastWord = words[words.length-1];

			if(thisKey == 'Enter') {
				console.log("I pressed enter");
				lastWord += '\n';
			}
			//console.log("last Word: " + lastWord);

			//if(lineShift) lastWord = lastWord + "\n"; 
			values.push({word: String(lastWord), spacing: +spacing.toFixed(dec), size: +tempFontSize.toFixed(0), tracking: +tracking.toFixed(dec), color: +color.toFixed(0) });
			//reset 
			deletedWordsCount = 0;
			jumpWord = false; 
			totalSpeed = 0;
			keyCount = 0; 
			topTime = 0;
			//tempFontSize = fontSize;
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
		 	if(values[values.length-1].size <= fontSize)
			values[values.length-1].size = tempFontSize;
		}

		if(jumpWord == false && lastJumpWord == true){
			values[values.length-1].size = tempFontSize;		
		}

		if(jumpWord) values[values.length-1].size = fontSize;
 		// update 
		lastJumpWord = jumpWord;
		previousKey = thisKey; 
 		lastWordLength = words.length; 
 		lastKeyHit = event.timeStamp;
 		  
 		// Finish and render text 
		if(thisKey == "ArrowDown" && !isRendered && minimumInput){
			//$("#inputText").blur();
			$('#inputText').blur();
			$(".output-wrapper").css("display","block-inline").hide().fadeIn('slow');
  			$( ".io-div" ).animate({
    			left: "-=13vh"
  			}, 700, function(){
    			isRendered = true;
    			console.log(isRendered)
  			});

  			//Write reflective question
  			$("#question").empty();
  			var reflectiveQuestion = new Typed("#question", {
			  strings: ["Read between the lines."],
			  typeSpeed: 45,
		  	  showCursor: false,
			});
  			$(".instructions").fadeOut('slow','linear', function(){
				$(".instructions").html( "<p>PRESS <span style='color: #0074FF;'>UP ARROW </span>TO SEE THE RULES <p>");	
				$(".instructions").fadeIn(1500,'linear');
				});		
			words = inputText.replace( /\n/g, " " ).split( " " );
     		renderText(words[words.length-1], thisKey);
		}
	})

		//Go to RULES page. 
		$("body").keydown(function( event ){

			if( $('#inputText').height() > $('.indication').outerHeight() && !minimumInput){
	 			console.log("extended");
	 			//$(".instructions").css("visibility", "visible");
	 			$(".instructions").html( "<p>PRESS <span style='color: #0074FF;'>DOWN ARROW </span><br> WHEN YOU FEEL READY</p>");

	 			$(".indication").fadeOut('slow','linear', function(){
					$(".instructions").fadeIn('slow','linear', function(){
						minimumInput = true;
					});
				});
 		}

			if(isRendered){
				console.log("hy im inside!!")
				if(rule_toggle){
					if(event.key == "ArrowUp" && !rules_on){
						console.log("hello there");
							$('.rules-wrapper').css("display", "block");
							$('.rules-wrapper').animate({
								bottom:"+=70vh"
							}, 1000);
							rules_on = true;
						}

					if(event.key == "ArrowDown" && rules_on){
						console.log("hello there");
							$('.rules-wrapper').css("display", "block");
							$('.rules-wrapper').animate({
								bottom:"-=70vh"
							}, 1000);
							rules_on = false;
						}
					}

				if(event.key == "F" || event.key == "f"){
					rule_toggle = false;
					console.log("finished");
					$('.logo-text').css("color","white");
					$('.instructions').css("display","none");
					$('.CTA').css("display","none");
					$('.rules-wrapper').css("display","none");
					$('.end-screen').css("display","block");
					window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
				}
			}
	});
}