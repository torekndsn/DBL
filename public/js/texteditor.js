		

	///////////////////////////////////////////////////////////////////////////////
	//------------- A P P L Y I N G   S T Y L E S   T O   T E X T ---------------//
	///////////////////////////////////////////////////////////////////////////////
	
	function renderText(lastword, thisKey){

		if(thisKey != " "){
			var lastword_ = lastword + thisKey;
			if(thisKey == 'Enter') lastword_ = '';
			
	 		values.push({word: lastword_, spacing: 0, size: 16, tracking: 0, color: 90 });
	 	}
	//	console.log("values: " + values);
		$("#outputText").empty();
 			jQuery.each(values, function(i, v) { 	

			 var w = values[i].word;
			 var spacing_ = values[i].spacing;
			 var size_ = values[i].size;
			 var tracking_ = values[i].tracking;

			 var col_ = values[i].color;
			 var newCol = "rgb(" + col_ + "," + col_ + "," + col_ + ")";
	
			 var newStyle = "<span " + 
			"style=\"padding-right:" + spacing_ +"px" + 
			";font-size:" + size_ + "px" + 
			";letter-spacing:" + tracking_ + "px" +
			";color:" + newCol +
			";\">";
			//	console.log(newStyle + w + " " + "</span>");	
			$("#outputText").append( $(newStyle + w + " " + "</span>"));
		})


 		 // make ready for csv export
 		 csvFile = CSV(values);	
 		 //console.log("CSV FILE: " + csvFile);
 		 var a = document.getElementById("a");
    	 a.href = "data:text/csv;base64," + btoa(csvFile);

 		
 		$('#export-btn').removeClass('hide');
 		$('#pdf-btn').removeClass('hide');
 		$('#render').text("reset");
		$("#render").off('click').on('click', reset);
 	}


	function reset() {  	
		location.reload();
	}


	//////////////////////////////////////////////////////////////////////////////
	//------------- S A V E   A N D   E X P O R T   A S   .C S V ---------------//
	//////////////////////////////////////////////////////////////////////////////
	// Returns a csv from an array of objects with
	// values separated by tabs and rows separated by newlines
	function CSV(array) {
	    // Use first element to choose the keys and the order
	    var keys = Object.keys(array[0]);

	    // Build header
	    var result = keys.join(",") + "\n";

	    // Add the rows
	    array.forEach(function(obj){
	        keys.forEach(function(k, ix){
	        	
	        	if(typeof obj[k] === 'string'){
	        	    if(obj[k].includes("\"") || obj[k].includes("\"")) obj[k] = "'" + obj[k] + "'";
	        		if(obj[k].includes("\n")) obj[k] = "\"" +obj[k]+"\"";
	        		if(obj[k].includes(",")) obj[k] = "\"" + obj[k] + "\"";			//		"\"http://example.com\""
	        		}
	            if (ix) result += ",";
	            
	            result += obj[k];
	        });
	        result += "\n";
	    });

	    return result;
	}
				

