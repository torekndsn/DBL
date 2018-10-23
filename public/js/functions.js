
		
	 	var avrTimeTempo = 185; // The avarage texting time for a person.
	 	var scaleFactor = 1.5; 		
	 	var fontSize = Math.round(16*scaleFactor);   
	 	$("#outputText").css("fontSize",fontSize);
		/////////////////////////////////////////////////
		//------------- T R A C K I N G ---------------//
		/////////////////////////////////////////////////

		function typingSpeed(totalSpeed_, keyCount_){
			var avrSpeed_ = totalSpeed_ / keyCount_;
			var trackingValue;
				//console.log("avrSpeed: " + avrSpeed_);
			//var tracking = map_range(avrSpeed, )
			if(avrSpeed_ > 170 ){
				trackingValue = map_range(avrSpeed_, 170, 300, 0, 7 * scaleFactor);
				trackingValue = constrain_value(trackingValue, 0, 7 * scaleFactor);
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
				var tracking = map_range(topTime, 700, 2500, 0, 200);
				tracking = constrain_value(tracking, 0, 200);
				return tracking;
			}
			else return 0;
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
				return spacing*scaleFactor;
			} else return 0; 		
		}



		///////////////////////////////////////////////
		//------------- D E L E T I N G -------------//
		///////////////////////////////////////////////

		function word_size(deleteCount){
			console.log("deleted count: " + deleteCount);
			var newSize = map_range(deleteCount, 0, 6,fontSize, 40*scaleFactor);
			newSize = constrain_value(newSize,fontSize, 40*scaleFactor);
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

	function disable_keys(){
		window.addEventListener("keydown", function(e) {
	    	console.log("key: " + e.keyCode);
	    	if(e.keyCode == 9) e.preventDefault();
	      //  e.preventDefault();
	    
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


  