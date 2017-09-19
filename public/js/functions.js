
		
	 	var avrTimeTempo = 185; // The avarage texting time for a person.		  



		/////////////////////////////////////////////////
		//------------- T R A C K I N G ---------------//
		/////////////////////////////////////////////////

		function typingSpeed(totalSpeed_, keyCount_){
			var avrSpeed_ = totalSpeed_ / keyCount_;
			var trackingValue;
				//console.log("avrSpeed: " + avrSpeed_);
			//var tracking = map_range(avrSpeed, )
			if(avrSpeed_ > 170 ){
				trackingValue = map_range(avrSpeed_, 170, 300, 0, 7);
				trackingValue = constrain_value(trackingValue, 0, 7);
			 }
			 else if(avrSpeed_ < 160){
			 	trackingValue = map_range(avrSpeed_, 60, 160, -3, 0);
				trackingValue = constrain_value(trackingValue, -3, 0);
			 }
			 else trackingValue = 0;

			 	//console.log("tracking value: " + trackingValue);
			 return trackingValue;
			}




		/////////////////////////////////////////////////
		//----------------- C O L O R -----------------//
		/////////////////////////////////////////////////
		function pauseColor(topTime){
			if(topTime > 1000){
				var tracking = map_range(topTime, 700, 2500, 90, 0);
				tracking = constrain_value(tracking, 0, 90);
				return tracking;
			}
			else return 90;
		}




		///////////////////////////////////////////////
		//------------- S P A C I N G ---------------//
		///////////////////////////////////////////////

		function word_spacing(timeData){
			var interval = timeData;
			if(interval > 1000) {
				//	console.log("interval: " + interval);
				var spacing = map_range(interval, 1000,3000,0,70);
				spacing = constrain_value(spacing,0,70);
				return spacing;
			} else return 0; 		
		}



		///////////////////////////////////////////////
		//------------- D E L E T I N G -------------//
		///////////////////////////////////////////////

		function word_size(deleteCount){
			console.log("deleted count: " + deleteCount);
			var newSize = map_range(deleteCount, 0, 6,16, 40);
			newSize = constrain_value(newSize,16, 40);
			console.log("size: " + newSize);
			return newSize; 
	    }



		////////////////////////////////////////////////////////////////////////////////////
		//------------- F U N C T I O N S   F O R   C A L C U L A T I O N S---------------//
		////////////////////////////////////////////////////////////////////////////////////

		//Map function
		function map_range(value, low1, high1, low2, high2) {
    		return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    	}

    	//Constrain value function
    	function constrain_value(value, min, max){
    		if(value < min) return min;
    		else if (value > max) return max;
    		else return value; 
    		}





	/////////////////////////////////////////////////////////////
	//------------- T E X T   T O   S P E E C H---------------//
	////////////////////////////////////////////////////////////

    	function questionsToSpeech(){
			var msg = new SpeechSynthesisUtterance();
			var voices = window.speechSynthesis.getVoices();
				msg.voice = voices[17]; // Note: some voices don't support altering params
				msg.voiceURI = 'native';
				msg.volume = 1; // 0 to 1
				msg.rate = 0.9; // 0.1 to 10
				msg.pitch = 1; //0 to 2
				msg.text = 'How would you describe your relationship to your mom?';
				msg.lang = 'en-US';

				speechSynthesis.speak(msg);
		}





	////////////////////////////////////////////////////////////////////////////////////
	//------------- P R E V E N T   T E X T B O X   N A V I GA T I O N ---------------//
	///////////////////////////////////////////////////////////////////////////////////

	function noKeyNav(){
		window.addEventListener("keydown", function(e) {
	    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	        e.preventDefault();
	    }
		}, false);
	}


	function courserFix(){
		var textarea = document.querySelector('#inputText');

		var reset = function (e) {
	   	  var len = this.value.length;
	   	 this.setSelectionRange(len, len);
		}

		textarea.addEventListener('focus', reset, false);
		textarea.addEventListener('mouseup', reset, false);
		textarea.addEventListener('keyup', reset, false);
		textarea.addEventListener('keydown', reset, false);

	}


  