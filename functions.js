
		
	 	var avrTimeTempo = 185; // The avarage texting time for a person.		  



		/////////////////////////////////////////////////
		//------------- T R A C K I N G ---------------//
		/////////////////////////////////////////////////

		function typingSpeed(totalSpeed_, keyCount_){
			var avrSpeed_ = totalSpeed_ / keyCount_;
			var trackingValue;
			console.log("avrSpeed: " + avrSpeed_);
			//var tracking = map_range(avrSpeed, )
			if(avrSpeed_ > 180 ){
				trackingValue = map_range(avrSpeed_, 180, 320, 0, 7);
				trackingValue = constrain_value(trackingValue, 0, 7);
			 }
			 else if(avrSpeed_ < 120){
			 	trackingValue = map_range(avrSpeed_, 60, 120, -3, 0);
				trackingValue = constrain_value(trackingValue, -3, 0);
			 }
			 else trackingValue = 0;

			 console.log("tracking value: " + trackingValue);
			 return trackingValue;
			}




		///////////////////////////////////////////////
		//------------- S P A C I N G ---------------//
		///////////////////////////////////////////////

		function word_spacing(timeData){
			var interval = timeData;
			if(interval > 1000) {
					console.log("interval: " + interval);
				var spacing = map_range(interval, 500,3000,5,50);
				spacing = constrain_value(spacing,0,50);
				return spacing;
			} else return 0; 		
		}



		///////////////////////////////////////////////
		//------------- D E L E T I N G -------------//
		///////////////////////////////////////////////

		function word_size(deleteCount){
			var newSize = map_range(deleteCount, 0, 6,16, 40);
			newSize = constrain_value(newSize,16, 40);
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

  