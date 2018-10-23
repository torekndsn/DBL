$(document).ready(function(){

console.log("catched");
var start = false;
//Skip conversation 
$("body").keydown(function( event ){
	console.log("catched");
		if(!start){
			console.log("catched");
			$("#conv-interface").css("display", "block")
			window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});;
			//initType(1, "#para-1", conversation[0]);
			start = true;
		}
	}); 



/* 
// Init new Type function
var initType = function(screenIndex, idName, stringObj){
		$(idName).css("display", "inline-block");
		var options = {
		  strings: [stringObj],
		  typeSpeed: 45,
		  showCursor: false,
		  onTypingPaused: (arrayPos, self) => {
		  	window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
		  },
		  onComplete: (self) => {
		  	if(!skip || screenIndex == 8){
		  		if(screenIndex == 8) $(".hidden").css("visibility","visible").hide().fadeIn('slow');
		  		else window.scrollTo({"behavior": "smooth","top":document.body.scrollHeight});
				$( "textarea" ).eq( screenIndex ).css("visibility", "visible").hide().fadeIn('slow');
					$('html,body').animate({scrollBottom: $('textarea').offset().top}, 200, function() {
				        $("textarea" ).eq( screenIndex ).focus();
				        console.log($( "textarea" ).eq( screenIndex ));
		  			});
		 	}
		 	
		  }
		}
	var typed = new Typed(idName, options);
	}



initType(1, "#para-1", conversation[0]);

*/ 

}