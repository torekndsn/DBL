$(document).ready(function(){

	var start = false
	var skip = false;
	var name;

	//intro annimation
	var animOption = {
		strings: ["Try me^200 out.<br>Discover^300 your<br>^400Digital Body^600 Language.","Try me out.^50 <br>Discover your^80 <br>Digital^50 Body Language.","Try me^600 out.<br>Discover^710 your<br>^700Digital Body Language.","Try me out.<br>Discover^500 your<br>Digital^350 Body Language.","Try me out.<br>Discover your<br>Digital Body Language.","Try me out.<br>Discover your<br>Digital Body Language."],
		typeSpeed: 40,
		backSpeed: 40,
		startDelay:1000,
		backDelay:1000,
		smartBackspace: false,
		showCursor: false,
		loop: true,
	}
	var introAnim = new Typed(".introScreen", animOption);






$("body").keydown(function( event ){
		if(!skip && event.key == "+"){
			skip = true;
			start = true;
			initTextProcesser();
		}
		else if(!start){
			start = true;
			console.log("this dosnøt happen more")
			$(".CTA-wrapper").fadeOut('slow','linear');
			$("#conv-interface").css("display", "inline-block")
			window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight+100});
			initConv(0,conversation[0]);
		}
	}); 


	// Init new Type function
	var idName = ""; 

	var initConv = function(index,stringObj){
		//$(idName).css("display", "inline-block");
		var options = {
		  strings: [stringObj],
		  typeSpeed: 40,
		  showCursor: false,
		  onTypingPaused: (arrayPos, self) => {
		  	window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight+100});
		  },
		  onComplete: (self) => {	
		  	if(index < 4){
			  $( "textarea" ).eq(index).css("visibility","visible");
			  $( "textarea" ).eq(index).focus();
			  checkAnswer(index);
			}

			if(index == 4){
				$(".CTA-wrapper").html( "<p>AWKWARD QUESTION?<br> PRESS<span style='color: #0074FF;'> RIGHT ARROW </span>TO CHANGE IT</p>");
				$(".CTA-wrapper").fadeIn('slow','linear');
				$( "textarea" ).eq(index).focus();
			}
		  }
		}
		//Get Id name of text and create type.js element
		idName = $('.computer').eq(index).attr('id');
		var typed = new Typed('#'+idName, options);
	}



	//Check conversation asnwers 
	var checkAnswer = function(index){
		$( "textarea" ).eq(index).keydown(function( event ){
			if(event.key == "Enter"){
				$("textarea").blur();
				window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});

				// Check for conversation state:
				if(index == 0){
					name = $(this).val();
				 	var nameToString = [conversation[1].slice(0,18), name, conversation[1].slice(18)].join('');
					initConv(1,nameToString);
				}
				else if(index == 1) initConv(2,conversation[2]);
				else if(index == 2){
					if( $(this).val().toLowerCase().includes("yes")) initConv(3,conversation[3]);
					else if( $(this).val().toLowerCase().includes("back")) window.location.reload();
					else $(this).focus();
				}
				else if(index == 3){
					if( $(this).val().toLowerCase().includes("go")) initTextProcesser(); 
					else $(this).focus(); 
				}
			}
		});
	}



	var initTextProcesser = function(){
		$('#input-section').css("display","inline-block");
		window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
		//$("#conv-interface").css("visibility", "hidden");
		//$(".human").css("display", "none");

		initConv(4,currentQuestion);
		noKeyNav();
		DBL();		

		//Change question toggle
		var questCounter = 0;
		$("body").keydown(function( event ){
			if(!choosedQuestion){
				if(event.key == "ArrowRight" || event.key == "ArrowLeft"){
					$("#question").empty();
					if(event.key == "ArrowRight" && !choosedQuestion){
						if(questCounter >= questions.length-1) questCounter = 0; 
						else questCounter++;
					}
					if(event.key == "ArrowLeft" && !choosedQuestion){
						if(questCounter <= 0) questCounter = questions.length-1; 
						else questCounter--;
					}
					currentQuestion = questions[questCounter]; 
					$("#question").text(questions[questCounter]);				
				}
			}
		}); 
	}

	$(window).on('resize', function(){
		window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
	});
});



