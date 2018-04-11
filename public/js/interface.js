

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
				  		if(wordInString(answer2, 'yes') || wordInString(answer2, 'YES')){
				  			console.log("yes was a part");

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
						console.log(answer4);

						if(wordInString(answer4, 'go') || wordInString(answer4, 'GO'))
				  		{
				  			console.log("i'll go");
				  			$("#screen1").fadeOut("normal", function() {
    				    		$(this).remove();
    						});

    					var question = new Typed("#question", {

    						strings: ["Question:</br></br>^1000How would you describe your relationship to your mom?"],
							startDelay: 1000,
							typeSpeed: slowType,
							showCursor: false,
							onComplete: (self) =>  {
								$('#DBL-box').fadeIn('normal');
								$('body').css("overflow", "visible");
								//	$('#inputText').focus();
							}
    					})	

				  		}
					}

				 });

				
				
			
 







			 /* 
			
			 	 $( "#fname" ).keydown(function( event ) {
			 	console.log("Hehllo");
			 	if(event.key == 'Enter'){
			 		if(wordInString($( "input:eq(0)" ).val(), 'yes') || wordInString($( "input:eq(0)" ).val(), 'YES'))
				   {
				  	$("#intro").fadeOut("normal", function() {
    				    $(this).remove();
    				});
				    new Typed("#decisionintro", decisionintro);
				    $('#div1').scrollTop($('#div1')[0].scrollHeight);
				    event.preventDefault();
				  }
				 else if (wordInString($( "input:eq(0)" ).val(), 'no') || wordInString($( "input:eq(0)" ).val(), 'NO')){
				 	// nothing
				 }
				 else {
				 	event.preventDefault();
				 }
				}
			});





			 var screen2_2 = {
			 	strings: ["Welcome, and thank you for starting the Digital Body Language.<br><br>^700What's about to happen is a performance. A performance from you.<br><br>^700It's going to be an embodiement of you action. An action you perform everyday, but an action which result dosen't reflect its process.<br><br>^700uhuh ... yih! i saw beyonces tizzles and my pizzle went crizzle sit amizzle, get down get down adipiscing elizzle. Nullizzle boofron velizzle, mofo go to hizzle, suscipizzle bizzle, gravida vizzle, arcu. Pellentesque go to hizzle tortizzle. Sizzle erizzle. Pizzle izzle dolor dapibus shiz tempizzle fo shizzle. Maurizzle pellentesque fo et turpizzle. Uhuh ..."],
				startDelay: 1000,
				typeSpeed: slowType,
				showCursor: false,
				onComplete: (self) =>  {

					new Typed("#introend", introend);
					$('#div1').scrollTop($('#div1')[0].scrollHeight);
				}
			 }

			 var introend = {
			 	strings: ["///////////////////////////////////////////////////////////////////////////"],
				startDelay: 500,
				typeSpeed: fastType,
				showCursor: false,
				onComplete: (self) =>  {
					new Typed("#continued", continued);
					$('#div1').scrollTop($('#div1')[0].scrollHeight);
				}
			 }



			
			 $( "#fname5" ).keydown(function( event ) {
			 	console.log("Hehllo");
			 	if(event.key == 'Enter'){
			 		if(wordInString($( "input:eq(0)" ).val(), 'yes') || wordInString($( "input:eq(0)" ).val(), 'YES'))
				   {
				  	$("#intro").fadeOut("normal", function() {
    				    $(this).remove();
    				});
				    new Typed("#decisionintro", decisionintro);
				    $('#div1').scrollTop($('#div1')[0].scrollHeight);
				    event.preventDefault();
				  }
				 else if (wordInString($( "input:eq(0)" ).val(), 'no') || wordInString($( "input:eq(0)" ).val(), 'NO')){
				 	// nothing
				 }
				 else {
				 	event.preventDefault();
				 }
				}
			});



			 // D I S I C I O N 

			  var decisionintro = {
			 	strings: ["///DECISION</br> ^700///////////////////////////////////////////////////////////////////////////"],
				startDelay: 1000,
				typeSpeed: fastType,
				showCursor: false,
				onComplete: (self) => {
				 new Typed("#decisiontext", decisiontext);
				 $('#div1').scrollTop($('#div1')[0].scrollHeight);
				}
			 }

			  var decisiontext = {
			 	strings: ["Your are going to do a peformance. And I'm going to ask you a question...</br></br>^700You answering the question with an answer from your heart, is going to be the performance</br></br>^700Are you ready to receive your question, and start the performance?"],
				startDelay: 1000,
				typeSpeed: slowType,
				showCursor: false,
				onComplete: (self) => {
				 new Typed("#decisionend", decisionend);
				 $('#div1').scrollTop($('#div1')[0].scrollHeight);
				}
			 }

			  var decisionend = {
			 	strings: ["///////////////////////////////////////////////////////////////////////////"],
				startDelay: 500,
				typeSpeed: fastType,
				showCursor: false,
				onComplete: (self) => {
				 new Typed("#getquestion", getquestion);
				 $('#div1').scrollTop($('#div1')[0].scrollHeight);
				}
			 }

			 var getquestion = {
				strings: ["If you are ready, type <b>'YES'</b> to get your question, or <b>'NO'</b> to stop."],
				startDelay: 1000,
				typeSpeed: slowType,
				showCursor: false,
				onComplete: (self) =>  {
					$( "#fname2" ).focus();
					$('#div1').scrollTop($('#div1')[0].scrollHeight);
				}
			}

			$( '#fname2').keydown(function( event ){
				
				if(event.key == 'Enter'){
					//event.preventDefault();
					console.log("im typing enter...")
					console.log( $( "#fname2" ).val());


					if(wordInString($( "input:eq(0)" ).val(), 'yes') || wordInString($( "input:eq(0)" ).val(), 'YES'))
					{
						console.log("yes was typed");

						$("#decision").fadeOut("normal", function() {
					    	$(this).remove();
					    }); 
					    

						new Typed("#question", question);
						$('#div1').scrollTop($('#div1')[0].scrollHeight);
						event.preventDefault();
							 
						}

						else if(wordInString($( "input:eq(0)" ).val(), 'no') || wordInString($( "input:eq(0)" ).val(), 'NO')) 
						{
							//noting
						}
						else {
							event.preventDefault();
						}			
				}
			});

				 // Q U E S T I O N
		    
			 var question = {
				strings: ["Question:</br></br>^1000How would you describe your relationship to your mom?"],
				startDelay: 1000,
				typeSpeed: slowType,
				showCursor: false,
				onComplete: (self) =>  {
					$('.content').fadeIn('normal');
					$('body').css("overflow", "visible");
				//	$('#inputText').focus();
				}
			}

*/ 
			// F U N C T I O N   B A N K
			function wordInString(s, word){
 				 return new RegExp( '\\b' + word + '\\b', 'i').test(s);
			}
			
		}