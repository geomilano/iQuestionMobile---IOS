var valObject = localStorage.getItem('valObj');
	console.log(valObject );
	 var arr =JSON.parse(valObject);
	 var arrQuestion = new Array();
	 var arrAnswer = {"q8_":[{"q8_1":"1"},{"q8_2":"2"},{"q8_3":"3"},{"q8_4":"4"},{"q8_5":"5"},{"q8_6":"6"}]};
	 var curQuestion = 0;
	 var ansSeq=new Array();
	 var checkPass=" ";
	 var i=0;
	 $("#question").html(arr["Query"]);
	$("#displayquestion").show();			
	$("#displayquestion").html(function(){
	temp +='<table><tr><td>';
		
		for(a=0; a <= 1; a++){
				if(arr['Items'][a]['coordinate'] == 'y'){
					
				arrQuestion = arr['Items'][a]['info'];
					
					 for(var j=0;j<arrQuestion.length;j++){
				checkPass+="<b>arrQuestion["+j+"] is </b>=>"+JSON.stringify(arrQuestion[j])+"<br>";
			   }
			   
			   console.log(checkPass );
				
				}
			}
		
		
		temp += '<div id="questions">'+arrQuestion[curQuestion]['text']+'</div>';
		
		
		temp += '<div id="selratopt">';
		
		for(i=0; i <= 1; i++){
				if(arr['Items'][i]['coordinate'] == 'x'){
					
					$.each(arr['Items'][i]['info'], function(k, child) {	
					
							if(arrAnswer[arr['Name']][curQuestion][arr['Name']+(curQuestion+1)]==child['value']){		
							temp += '<div id="opts" class="selected">'+child['text']+"<input type='hidden' value='"+child['value']+"' /></div>";	
							}else{
							temp += '<div id="opts">'+child['text']+"<input type='hidden' value='"+child['value']+"' /></div>";	
							}				
					});	
					
				}
			}
		
		
		
		temp += '</div>';
		
	temp +='</td></tr></table>';
		
		
		
		 return temp;
	});		
	$("#displayquestion").trigger("create");
	
	
	
	$('#selratopt #opts').click(function() {
			//$(this).hide();
 			 //$('#target').click();
 			 
 			$("#selratopt").find('.selected').toggleClass('selected');
 			 
 			console.log("cur val"+$(this).find( 'input[type="hidden"]' ).val());
 			
 			//value to be fetch = (this).find( 'input[type="hidden"]' ).val()
 			
 			curQuestion=curQuestion+1;
 			
 			console.log(arr['Name']+curQuestion); //currrent question each click should store {"current question":"value to be fetch"}; 
 			
 			if(curQuestion<arrQuestion.length){
 			
 			document.getElementById('questions').innerHTML=arrQuestion[curQuestion]['text'];
 			console.log(arrQuestion[curQuestion]['text']);	 
 			
 			//arrAnswer[arr['Name']][curQuestion][arr['Name']+(curQuestion+1)]
 			var search= 'input[value="'+arrAnswer[arr['Name']][curQuestion][arr['Name']+(curQuestion+1)]+'"]';
 			
 			console.log(search);
 			
 			$(search).parent('#opts').toggleClass('selected');
 		
 			
 			} else{
 			console.log('exit here');
 			//proceed to next question and save answer handler
 			}
 			
 			/*document.getElementById('questions').innerHTML=arrQuestion[curQuestion]['text'];
 			console.log(arrQuestion[curQuestion]['text']);*/	 
 			
 		 
		});
	
	//Remove tempararily local storage   
	localStorage.removeItem('valObj');
	
	  