

function interface(){

			var keyNotHit = false;
			var slowType = 40; //40
			var fastType = 20; //20
 
			///////////////// I N T R O    S C R E E N /////////////////
			$( ".contentcontainer" ).hide();
			 var Type = new Typed('#header', {
				strings: ["Press any key<br>to discover your<br>digital body language."],
				startDelay: 1000,
				typeSpeed: fastType,
				showCursor: false,
				backSpeed: 10,
				loop: false,
				onComplete: (self) => keyNotHit = true,
			});	
			 	
				$(document).keypress(function(event) {
					if(keyNotHit){
	     				keyNotHit = false;
	     			
	     			//remove header container and intro
 					$(".headercontainer").fadeOut("normal", function() {
    				    $(this).remove();
    				});

 					//DISPLAY SCREEN 1_1
    				$(".contentcontainer" ).show();
	     			var screen1_1 = new Typed("#screen1_1", {
	     					strings: ["Hi, please take a seat and write to me.<br> ^700What should I call you?"],
	     					startDelay: 1000,
	     					typeSpeed: slowType,
	     					showCursor: false,
	     					loop: false,
	     					onComplete: (self) => {
	     						$( "#input_1" ).focus();
	     					}
	     			}); 
     				}
     				//return false;
				});

				 var name = "name";
				  $( "#input_1" ).keydown(function( event ) {
				  	if(event.key == 'Enter'){
				  		name = $("#input_1").val(); 
				  		console.log(name);
				  		$(".section1").fadeOut("normal", function() {
    				    	$(this).remove();
    					});

				  		//DISPLAY SCREEN 1_2
				  		var screen1_2 = new Typed("#screen1_2", {
				  			strings:["Nice to meet you, " + name + ".<br> ^700I am curious; do you ever have the feeling that something is lost when we communicate through technology?"],
				  			startDelay: 1000,
	     					typeSpeed: slowType,
	     					showCursor: false,
	     					loop: false,
	     					onComplete: (self) => {
	     					 $( "#input_2" ).focus();
	     					}
				  		})
				  	}
				 });

				 var answer2 = "empty";
				 $( "#input_2" ).keydown(function( event ) {
				  	if(event.key == 'Enter'){
				  		answer2 = $("#input_2").val(); 
				  		console.log("the answer: " + answer2);
				  			$(".section2").fadeOut("normal", function() {
    				    		$(this).remove();
    						});

						//DISPLAY SCREEN 1_3
				  		var screen1_3 = new Typed("#screen1_3", {
				  			strings:["Because you see, I was thinking about typing.<br>^700It’s an action that doesn’t reflect the process. You just typed your answers to me, but did you hesitate? Did you type that rushing, eager to see the next screen? <br><br>^700 Would you like to participate in a small test to reveal what of you disappears into the keyboard? <br> ^700Type <b>YES</b> to start or <b>BACK</b> to return to the home screen."],
				  			startDelay: 1000,
	     					typeSpeed: slowType,
	     					showCursor: false,
	     					loop: false,
	     					onComplete: (self) => {
	     						 $( "#input_3" ).focus();
	     					}
				  		})		
					}
				}); 



				 var answer3 = "empty";
				 $( "#input_3" ).keydown(function( event ) {
				  	if(event.key == 'Enter'){
				  		answer3 = $("#input_3").val(); 
				  		console.log("the answer: " + answer3);
				  		if(wordInString(answer3, 'yes') || wordInString(answer3, 'YES'))
				  		{
				  			console.log("yes was a part");

				  			$(".section3").fadeOut("normal", function() {
    				    		$(this).remove();
    						});

							var screen2_1 = new Typed("#screen2_1", {
				  			strings:["Great. It’s very simple. I will ask you one question. It may be quite personal, so if you want to back off, press ESC anytime. Otherwise, do not think too much. Just answer from your heart.<br>^700 Type GO when you are ready."],
				  			startDelay: 1000,
	     					typeSpeed: slowType,
	     					showCursor: false,
	     					loop: false,
	     					onComplete: (self) => {
	     						 $( "#input_4" ).focus();
	     						}
				  			})

				  		}
    					else if (wordInString(answer3, 'back') || wordInString(answer3, 'BACK')){
    						location.reload();
    					}
    				}
    			}); 

				 var answer4 = "empty";
				 $("#input_4").keydown(function ( event) {
					if(event.key == 'Enter') {
						answer4 = $("#input_4").val(); 
						//console.log();


						if(wordInString(answer4, 'go') || wordInString(answer4, 'GO'))
				  		{
				  			console.log("i'll go");
				  			$(".section4").fadeOut("normal", function() {
    				    		$(this).remove();
    						});

    					var question = new Typed("#question", {

    						strings: ["Question:</br>^1000"+questionArr[2]],
							startDelay: 1000,
							typeSpeed: slowType,
							showCursor: false,
							onComplete: (self) =>  {
								$('#DBL-box').fadeIn('normal');
								$("#input-section").fadeIn('normal');
								$('body').css("overflow", "visible");
								$('#inputText').focus();
							}
    					})	
				  		}
					}
				 });

				 $("#render").on('click', function(e) {
					e.preventDefault(); 
					$("#output-section").fadeIn('normal');
				 }); 

			// F U N C T I O N   B A N K
			var questionArr = [
			"How would you describe your relationship with your mother?",
			"What is your earliest memory?", 
			"Why is your best friend your best friend?",
			"What is the hardest thing that has ever happened to you?",
			"Can you describe your first kiss?",
			"Which parent are you closer to and why?",
			"If you could take back one thing you have done in life, what would it be?",
			"What's the last thing that made you cry?",
			"What's the stupidest thing you have ever done?",
			"Have you ever broken somebody's heart? How?",
			"What do you wish others would understand better about you?",
			"What makes you feel like home?",
			"If you could change anything about the way you were raised, what would you change?"
			];

			function wordInString(s, word){
 				 return new RegExp( '\\b' + word + '\\b', 'i').test(s);
			}
		}