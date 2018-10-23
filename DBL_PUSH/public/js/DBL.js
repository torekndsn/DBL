

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
	var rules_on = false;
	var rule_toggle = true;
	var lastScreen = false;




	var check_if_started = function(){
		//reset time if nothing has been typed
		if(inputText.length <=  0){
			lastKeyHit = currentMillis;
			resetValues();
			if(choosedQuestion){
				choosedQuestion = false;
				$(".CTA-wrapper").fadeIn('slow','linear', function(){
					$(".indication").fadeOut('slow','linear', function(){
					});
				});
			}
		}
		else{
			if(!choosedQuestion){
				choosedQuestion = true;
				$(".CTA-wrapper").fadeOut('slow','linear', function(){
					$(".indication").fadeIn('slow','linear', function(){
					});
				});
			}
		}
	}


	var check_spacing = function(){
		if(previousKey == " " || thisKey == " "){
			spacing = word_spacing(timeData);
			if( words.length > 1 && previousKey == " " && values[values.length-1].spacing == 0){
				values[values.length-1].spacing = spacing;
			}
		}
		else spacing = 0; 
	}

	var add_distotion = function(){
		// E N D   R E C O R D - if space is hit, a word is done. 
		if(thisKey == " " || thisKey == 'Enter' && words.length > 0){
			if(!jumpWord) tempFontSize = word_size(deletedWordsCount);

		 	if(keyCount > 1 )tracking = typingSpeed(totalSpeed, keyCount);
			else tracking = 0; 
			if(words.length == 1) tracking = 0;	 //temporary fix for the first word

			lastWord = words[words.length-1];

			if(thisKey == 'Enter') {
				lastWord += '\n';
			}
			values.push({word: String(lastWord), spacing: +spacing.toFixed(dec), size: +tempFontSize.toFixed(0), tracking: +tracking.toFixed(dec), color: +color.toFixed(0) });
			resetValues();
		}

		// T R A C K I N G   A N D   P A U S E   C O L O R
		else{
			if(thisKey != 'Backspace' && inputText.length > 1){
				totalSpeed += timeData;
				keyCount++;

				if(timeData > topTime){
					 topTime = timeData;
				     color = pauseColor(topTime);
				 }
			}
		}
	}

	var check_deletion = function(){
		
	}

	var resetValues = function(){
		deletedWordsCount = 0;
		jumpWord = false; 
		totalSpeed = 0;
		keyCount = 0; 
		topTime = 0;
	}

	///////////////////  START NEW LOOP WHEN KEY IS PRESSED  ///////////////////
	$("#inputText").keydown(function( event ){

		///////////////////////////////////////////////////////////////////////
		//Get/update trackings
		thisKey = event.key;
		currentMillis = event.timeStamp;
		inputText = this.value;
		words = inputText.replace( /\n/g, " " ).split( " " ); // get input text and get every word into array. 

		//Check if writing has begun
		check_if_started();

		//if something has been typed, record keystroke timestamps.
		if(inputText.length > 0) timeData = currentMillis - lastKeyHit;

		// S P A C I N G // - if break between words, get time interval to spacing
		check_spacing();
	
		// D E L E T I N G   R U L E // - if words are delted, it chould affect font-size of next word
		if(thisKey == 'Backspace' && words.length < lastWordLength) deletedWordsCount++; 

		//Push values to word array 
		add_distotion();

		//
		check_deletion();

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
  			$( ".textbox-wrapper" ).animate({
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
  			$(".CTA-wrapper").fadeOut('slow','linear', function(){
				$(".CTA-wrapper").html( "<p>PRESS <span style='color: #0074FF;'>UP ARROW </span>TO SEE THE RULES <p>");	
				$(".CTA-wrapper").fadeIn(1500,'linear');
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
	 			$(".CTA-wrapper").html( "<p>PRESS <span style='color: #0074FF;'>DOWN ARROW </span><br> WHEN YOU FEEL READY</p>");
	 			$(".indication").fadeOut('slow','linear', function(){
					$(".CTA-wrapper").fadeIn('slow','linear', function(){
						minimumInput = true;
					});
				});
 		}

			if(isRendered){
				if(rule_toggle){
					if(event.key == "ArrowUp" && !rules_on){
							$(".CTA-wrapper").html( "<p>PRESS <span style='color: white;'>F </span>TO FINNISH</p>");
							$('.post-section').css("display", "block");

							$('#input-section').css("min-height","104vh");

							$('.post-section').animate({
								bottom:"+=40vh"
							}, 1000,function(){
								window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
							});
							rules_on = true;
							
						}

					/* if(event.key == "ArrowDown" && rules_on){
						console.log("hello there");
							$('.post-section').animate({
								bottom:"-=300px"
							}, 1000);
							rules_on = false;
						} */ 
					}

				if(event.key == "F" || event.key == "f" && !lastScreen){
					rule_toggle = false;
					console.log("finished");
					$('.logo-text').css("color","white");
					$('.instructions').css("display","none");
					$('.CTA').css("display","none");
					$('.rules-wrapper').css("display","none");
					$('.end-screen').css("display","inline-block");
					window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
					lastScreen = true;

					//******** But the code bellow this BILA! **********//
					setTimeout(function(){ 
						window.location.reload();
					 }, 10000);
					//******** But the code above this BILA! **********//

							/* $('.post-section').animate({
								bottom:"+=80vh"
							}, 1000,function(){
								window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
							});
							*/
				}
			}
	});
}