$(document).ready(function(){
	var skip = false;
	var start = false;
	//Skip conversation 
	$("body").keydown(function( event ){
		if(event.key == "+" && !skip ){
			skip = true;
			initTextProcesser();
		}
		if(!start){
			$(".content").css("display", "block").hide().fadeIn('slow');
			window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
			initType(1, "#para-1", conversation[0]);
			start = true;
		}
	}); 
	checkAnswer(0);
	checkAnswer(1);
	checkAnswer(2);
	checkAnswer(3);

	// Init new Type function
	var initType = function(screenIndex, idName, stringObj){
		$(idName).css("display", "inline-block");
		var options = {
		  strings: [stringObj],
		  typeSpeed: 40,
		  showCursor: false,
		  onTypingPaused: (arrayPos, self) => {
		  	window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
		  },
		  onComplete: (self) => {
		  	if(!skip || screenIndex == 8){
		  			if(screenIndex == 8){
		  				$(".hidden").css("visibility","visible").hide().fadeIn('slow');
		  			}
				  	$( "textarea" ).eq( screenIndex ).css("visibility", "visible").hide().fadeIn('slow');
				  	$('html,body').animate({scrollBottom: $('textarea').offset().top}, 200, function() {
			        $("textarea" ).eq( screenIndex ).focus();
			        console.log($( "textarea" ).eq( screenIndex ));
		  		});
			  	window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
		 	}
		  }
		}
	var typed = new Typed(idName, options);
	}

	function checkAnswer(index){
		$( "textarea" ).eq(index).keydown(function( event ){
			if(event.key == "Enter"){
				$("textarea").blur();
				window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
				// Check for conversation state:
				if(index == 0){
					name = $(this).val();
				 	var nameToString = [conversation[1].slice(0,18), name, conversation[1].slice(18)].join('');
					initType(3, "#para-2", nameToString);
				}
				else if (index == 1) initType(5, "#para-3", conversation[2]);
				else if (index == 2) {
					if( $(this).val().toLowerCase().includes("yes")) initType(7, "#para-4", conversation[3]);
					else if( $(this).val().toLowerCase().includes("back")) window.location.reload();
				}
				else if (index == 3) initTextProcesser();  
			}
		});
	}

	function initTextProcesser(){
		$(".text-processer").css("display", "block").hide().fadeIn('slow');
		window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
		initType(8,"#question","^700"+""+questions[0]);
		skip = true;

		noKeyNav();
		DBL();		
		//Change question toggle
		var questCounter = 0;
		$("body").keydown(function( event ){
			//console.log("choosedQuestion state: ") + choosedQuestion
			if(event.key == "ArrowRight" && !choosedQuestion){
				$("#question").empty();
				if(questCounter > questions.length) questCounter = 0; 
				else questCounter++;
				currentQuestion = questions[questCounter]; 
				$("#question").text(questions[questCounter]);
			}
			if(event.key == "ArrowLeft" && !choosedQuestion){
				$("#question").empty();
				if(questCounter <= 0) questCounter = questions.length-1; 
				else questCounter--;
				currentQuestion = questions[questCounter]; 
				$("#question").text(questions[questCounter]);
			}
		}); 
	}

});



