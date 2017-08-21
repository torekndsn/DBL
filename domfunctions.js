	


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

	// A P P L Y I N G   S T Y L E 
	function renderText(lastword, prevKey){

		if(prevKey != " "){
			var lastword_ = lastword + prevKey;
			console.log("lastword: " + lastword_);
	 		console.log("last array word: " + values[values.length-1].word); 
	 		values.push({word: lastword_, spacing: 0, size: 16, tracking: 0, color: 90 });
	 	}
	
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

 		$('#render').text("reset");
		$("#render").off('click').on('click', reset);
 	}


	function reset() {  	
		location.reload();
	} 


			

