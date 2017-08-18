	


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

