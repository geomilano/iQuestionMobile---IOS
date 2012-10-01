
	var valObject = localStorage.getItem('valObj');
//	console.log(valObject );
	var arrAnswer={"q7_":[{"q7_1":"2"},{"q7_2":"3"},{"q7_3":"1"},]};
	$("#displayquestion").show();					
	var arr =JSON.parse(valObject);
	$("#question").html(arr["Query"]);
	temp ='<fieldset data-role="controlgroup">';
	var answerCol={};
	answerCol[arr['Name']]=[];
		
			for(i=0; i <= 1; i++){
				if(arr['Items'][i]['coordinate'] == 'x'){
					temp +='<table ><tr><td width="100px">&nbsp;</td>';	
					$.each(arr['Items'][i]['info'], function(k, child) {						
							temp += '<td width="100px" align="right">'+child['text']+"</td>";						
					});	
					temp +='</tr></table>';	
				}
			}

			/*for(j=0; j <= 1; j++){
				if(arr['Items'][j]['coordinate'] == 'y'){
					temp +='<table   >';	
					$.each(arr['Items'][j]['info'], function(k, child) {
						
							temp += '<tr><td width="100px">'+child['text']+'</td><td width="100px"></td><td width="100px"></td><td width="100px"></td></tr>';
						
					});	
					temp +='</table>';	
				}
			}*/
			
			
			
			for(j=0; j <= 1; j++){
				if(arr['Items'][j]['coordinate'] == 'y'){
					temp +='<table id="answer"  >';	
					$.each(arr['Items'][j]['info'], function(k, child) {
						
							temp += '<tr><td width="100px">'+child['text']+'</td>';
							
							
							for(z=0; z <= 1; z++){
							if(arr['Items'][z]['coordinate'] == 'x'){
					 				var itemAt=0;
								$.each(arr['Items'][z]['info'], function(k, child2) {
								
									if(arrAnswer[arr['Name']][k][arr['Name']+child2['value']]==child['value']){	
														
									temp += '<td width="100px" align="center" cellpadding="0">'+'<input type="radio" name="'+arr['Name']+child2['value']+'" value="'+child['value']+'" checked="checked">'+"</td>";
										
									}else{
									
									temp += '<td width="100px" align="center" cellpadding="0">'+'<input type="radio" name="'+arr['Name']+child2['value']+'" value="'+child['value']+'">'+"</td>";	
									
									}	
									itemAt++;				
							});	
							
							temp +='</tr>';
					
				}
			}
							
							
						
					});	
					temp +='</table>';	
				}
			}
			
			
			
			temp +='</fieldset>';		

		$("#displayquestion").html(temp);
		
		$('#answer tr td input').click(function(){
		
			console.log($(this).attr("name"));
 			console.log($(this).val());
 			
 			if(answerCol[arr['Name']].length !== 0){
 			
 			for( var k = 0; k <answerCol[arr['Name']].length; k++ ) {
 		
 					
        		if( $(this).val() != answerCol[arr['Name']][k][$(this).attr("name")] ) {
            	
            	answerCol[arr['Name']][k][$(this).attr("name")] = $(this).val() ;   			
        			
        		}else{
        		
        		answerCol[arr['Name']].push(JSON.parse('{"'+$(this).attr("name")+'":"'+$(this).val()+'"}'));
        		
        		}
   			 }
   			 
   			}else{
   			
   				answerCol[arr['Name']].push(JSON.parse('{"'+$(this).attr("name")+'":"'+$(this).val()+'"}'));
   			
   			}
   			
   		//	console.log(JSON.stringify(answerCol));

		});
	
	$("#displayquestion").trigger("create");


	//Remove tempararily local storage
	localStorage.removeItem('valObj');

	
	
