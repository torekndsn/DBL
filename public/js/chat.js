
function renderChat(lastword, thisKey, dataArr){
		var msg =""; 
		if(thisKey != " "){
			
			var lastword = lastword + thisKey;
			if(thisKey == 'Enter') lastword = '';
	 		dataArr.push({word: lastword, spacing: 0, size: 16, tracking: 0, color: 90 });
	 	}
	
 			jQuery.each(dataArr, function(i, v) { 	

			 var w = dataArr[i].word;
			 var spacing_ = dataArr[i].spacing;
			 var size_ = dataArr[i].size;
			 var tracking_ = dataArr[i].tracking;

			 var col_ = dataArr[i].color;
			 var newCol = "rgb(" + col_ + "," + col_ + "," + col_ + ")";
	
			 var newStyle = "<span " + 
			"style=\"padding-right:" + spacing_ +"px" + 
			";font-size:" + size_ + "px" + 
			";letter-spacing:" + tracking_ + "px" +
			";color:" + newCol +
			";\">";

			msg += newStyle + w + " " + "</span>";
		})
	
 		console.log("dataArr: " + dataArr);
 		dataArr = []; 
 		//place own msg into chat
 		newMsgIntern(msg);
 		//send outputText to server	
 		socket.emit('messeage', msg); 	
 	}

 
	


	////////////////////////////////////////////////////////////////////////////////////////
	//------------- C R E A T E   T E X T  B O X   F O R   C H A T   M S G ---------------//
	////////////////////////////////////////////////////////////////////////////////////////


	// I N C O M I N G   M S G   U P D A T E 
	function newMsg(data){
		var div ='<div class= "chat-object">' +
					'<div class="right">' +
						'<h3> stranger </h3>' +
						' <div class= "msg" >' + data + '</div>' +
					'</div>' +
				'</div>';
	 	$(div).appendTo('.msgWrapper');
	 		$(function () {
  			$('#wrapper').scrollTop(1E10);
		});
	}

	// I N T E R N   M S G   U P D A T E 
	function newMsgIntern (myMsg){
		var div ='<div class="chat-object">' +
					'<div class="left">' +
						'<h3> you </h3>' +
						' <div class= "msg" >' + myMsg + '</div>' +
					'</div>' +
				'</div>';
		$(div).appendTo('.msgWrapper');
			$(function () {
  			$('#wrapper').scrollTop(1E10);
		});
	}