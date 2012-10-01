var valObject = localStorage.getItem('valObj');
	console.log(valObject );
	 var arr =JSON.parse(valObject);
	 var arrQuestion = new Array();
	 var curQuestion = 0;
	 var ansSeq=new Array();
	 var checkPass=" ";
	 var i=0;
	 var answerCol={};
	 answerCol[arr['Name']]=[];
	 $("#question").html(arr["Query"]);

	 
	$("#displayquestion").show();			
	$("#displayquestion").html(function(){
	
		
		for(a=0; a <= 1; a++){
				if(arr['Items'][a]['coordinate'] == 'y'){
					
				arrQuestion = arr['Items'][a]['info'];
					
					 for(var j=0;j<arrQuestion.length;j++){
				checkPass+="<b>arrQuestion["+j+"] is </b>=>"+JSON.stringify(arrQuestion[j])+"<br>";
			   }
			   
			   console.log(checkPass );
				
				}
			}
		
		temp +='<table><tr><td>';
		temp += '<div id="questions">'+arrQuestion[curQuestion]['text']+'</div>';
		
		
		temp += '<div id="selratopt">';
		
		for(i=0; i <= 1; i++){
				if(arr['Items'][i]['coordinate'] == 'x'){
					
					$.each(arr['Items'][i]['info'], function(k, child) {
							if(child['value']!=98){						
							temp += '<div id="opts">'+child['text']+"<input type='hidden' name='_"+child['value']+"' /></div>";
							}else{
							temp += '<div id="opts">'+child['text']+"<input type='text' name='_98'/></div>";
							}						
					});	
					
				}
			}
		
		
		
		temp += '</div>';
		
		temp += '</td></tr><tr><td><div id="nextbutton" ><input  type="button" height="30" value="next statement" /></div></td></td>';
		temp +='</td></tr></table>';
		
		
		
		 return temp;
	});		
	$("#displayquestion").trigger("create");
	
	
	
	$('#selratopt #opts').click(function() {
			//$(this).hide();
 			 //$('#target').click();
 			 
 			 $(this).toggleClass('selected');
 			 console.log(arr['Name']+curQuestion);
 			 
 			/*curQuestion=curQuestion+1;
 			
 			if(curQuestion<arrQuestion.length){
 			
 			document.getElementById('questions').innerHTML=arrQuestion[curQuestion]['text'];
 			console.log(arrQuestion[curQuestion]['text']);	 
 			  
 			} else{
 			console.log('exit here');
 			}*/
 			
 			/*document.getElementById('questions').innerHTML=arrQuestion[curQuestion]['text'];
 			console.log(arrQuestion[curQuestion]['text']);*/	 
 			
 		 
		});
		
		$('#nextbutton').click(function() {
		
		curQuestion=curQuestion+1;
		
		$.each($("#selratopt").find('#opts'),function(k, value){
			
			if($(value).hasClass('selected')){
			console.log('{"'+arr['Name']+(arrQuestion[curQuestion]['value']-1)+$(value).children().attr('name')+'":"1"}');
			
			answerCol[arr['Name']].push(JSON.parse('{"'+arr['Name']+(arrQuestion[curQuestion]['value']-1)+$(value).children().attr('name')+'":"1"}'));
			
			}else{
			console.log('{"'+arr['Name']+(arrQuestion[curQuestion]['value']-1)+$(value).children().attr('name')+'":"0"}');
			
			answerCol[arr['Name']].push(JSON.parse('{"'+arr['Name']+(arrQuestion[curQuestion]['value']-1)+$(value).children().attr('name')+'":"0"}'));
			
			}
			
			
			//collect answer on next statement click
			//see log when clicking "next statement button"
			//still need to add the text input in if statement
		
		
		
		
		});
		
		console.log(JSON.stringify(answerCol));
		
		if(curQuestion<arrQuestion.length){
		document.getElementById('questions').innerHTML=arrQuestion[curQuestion]['text'];
		
		}
		
		if(curQuestion>((arrQuestion.length)-2)){
		document.getElementById('nextbutton').innerHTML="Next Question..";
		}
		
		$('#questions').scrollTop(30);
		//reset previous selected option
		$("#selratopt").find('.selected').toggleClass('selected');
			
		});
	
	//Remove tempararily local storage   
	localStorage.removeItem('valObj');
	
	  
