
			  var minTimeTempo = 80;      // MINIMUM interval to consider, this should be good. 
			  var maxTimeTempo = 350;   // Maximum interval to consider, much delay than 250 will become more as a pause i guess. 
			  var avrTimeTempo = 185; // The avarage texting time for a person.		  
			  var minValTempo = -2; // the amount of visual impact in the narrowing the kerning of a sentence.
			  var maxValTempo = 15; // the amount of visual impact in increasing the kerning of a sentence.
			  var minTimeSpace = 500;

			  var maxTimeSpace = 3000







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

  