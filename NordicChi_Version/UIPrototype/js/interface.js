$(document).ready(function(){

 var conversation = ["Hi, please take a seat and write to me.<br>^500 What should I call you?",
"Nice to meet you, . <br>^500I am curious; do you ever have the feeling that something is lost when we communicate through technology?",
"Because you see,^500 I was thinking about typing.^500 It’s an action that doesn’t reflect the process.<br><br> ^500You just typed your answers to me, but did you hesitate? <br>^500 Did you type that rushing, eager to see the next screen?  <br><br>^1000Would you like to participate in a small test to reveal what of you disappears into the keyboard?<br><br>^500Type YES to start or BACK to return to the home screen."
]; 

var name = "name";

// Init new Type function
var initType = function(screenIndex, idName, stringObj){
	$(idName).css("display", "inline-block");
	var options = {
	  strings: [stringObj],
	  typeSpeed: 40,
	  showCursor: false,
	  onTypingPaused: (arrayPos, self) => {
	  	console.log($(document).height());
	  	window.scrollTo(0, document.body.scrollHeight);
	  },
	  onComplete: (self) => {
	  	$( "textarea" ).eq( screenIndex ).css("visibility", "visible");
	  	$( "textarea" ).eq( screenIndex ).focus();
	  	window.scrollTo(0, document.body.scrollHeight);
	  }
	}
var typed = new Typed(idName, options);
}

initType(1, "#para-1", conversation[0]);

//Check fotdyz answer 
$( "textarea" ).eq(0).keydown(function( event ){
		if(event.key == "Enter"){
			name = $(this).val();
			console.log(name);
			$("textarea").blur();
			window.scrollTo(0, document.body.scrollHeight);
			var nameToString = [conversation[1].slice(0,18), name, conversation[1].slice(18)].join('');
			initType(3, "#para-2", nameToString);
		}
	}); 


checkAnswer(0);
checkAnswer(1);
checkAnswer(2);

function checkAnswer(index){
	$( "textarea" ).eq(index).keydown(function( event ){
		if(event.key == "Enter"){
			console.log("is done");
			$("textarea").blur();
			window.scrollTo(0, document.body.scrollHeight);
			// Check for conversation state:
			if(index == 0){
				name = $(this).val();
			 	var nameToString = [conversation[1].slice(0,18), name, conversation[1].slice(18)].join('');
				initType(3, "#para-2", nameToString);
			}

			else if (index == 1) initType(5, "#para-3", conversation[2]);
			else if (index == 2) initType(5, "#para-3", conversation[2]);
		}
	});
}

/*

$( "textarea" ).eq(1).keydown(function( event ){
		if(event.key == "Enter"){
			console.log("is done");
			$("textarea").blur();
			window.scrollTo(0, document.body.scrollHeight);
			initType(5, "#para-3", conversation[2]);
		}
	});

$( "textarea" ).eq(2).keydown(function( event ){
		if(event.key == "Enter"){
			if($(this).val().includes("yes")) console.log("is done");
			$("textarea").blur();
			window.scrollTo(0, document.body.scrollHeight);
			initType(5, "#para-3", conversation[2]);
		}
	}); 
	*/
});



