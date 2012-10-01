
	var valObject = localStorage.getItem('valObj');
	var arr =JSON.parse(valObject);
	var arrAnswer={"q3_":[{"q3_1_1":"test q3_1_1 "},{"q3_2_1":"test q3_2_1"},{"q3_3_1":"test q3_3_1"},]};
	var answerCol={};
	answerCol[arr['Name']]=[];
	$("#question").html(arr["Query"]);
	var temp = "<table id='maintbl'>";
  $("#displayquestion").show();			
 	$("#displayquestion").html(function(){
 	
	 	/*$.each(arr['Items']['0']['info'], function(k, child) {
	 		temp += "<tr><td>"+child['text'] + '</td><td><input type="text" name="'+arr['Name']+'" id="basic" data-mini="true" /></td></td>';
	 	});	*/
	 		
	 			for(y=0;y<arr['Items']['0']['count'];y++){
	 			
	 				temp += "<tr><td>"+arr['Items']['0']['info'][y]['text'] +'</td>';
	 				
	 					for(x=0;x<arr['Items']['1']['count'];x++){
	 					
	 						
	 						var qName= arr['Name']+arr['Items']['0']['info'][y]['value']+ '_' +arr['Items']['1']['info'][x]['value']; 
	 						
	 						if(arrAnswer[arr['Name']][y][qName]!=null){
	 						
	 						temp +='<td><input type="text" name="' +qName+ '" id="basic" data-mini="true" value="'+arrAnswer[arr['Name']][y][qName]+'" /></td>';
	 						
	 						}else{
	 						
	 						temp +='<td><input type="text" name="' +qName+ '" id="basic" data-mini="true" /></td>';
	 						
	 						}
	 							
	 					}
	 					
	 				temp +="</tr>";	
	 			}
	 	
	 	
	 	
	 	temp += "</table>";
 		 return temp;
 	});		

 	$("#displayquestion").trigger("create");
 	
// 	$("#maintbl tr td input").blur(function(){
// 	
// 	console.log($(this).attr("name"));
// 	console.log($(this).val());
// 	
// 		if(answerCol[arr['Name']].length !== 0){
// 			
// 			for( var k = 0; k <answerCol[arr['Name']].length; k++ ) {
// 			 					
//        		if( $(this).val() != answerCol[arr['Name']][k][$(this).attr("name")] ) {
//            	
//            	answerCol[arr['Name']][k][$(this).attr("name")] = $(this).val() ;   			
//        			
//        		}else{
//        		
//        		answerCol[arr['Name']].push(JSON.parse('{"'+$(this).attr("name")+'":"'+$(this).val()+'"}'));
//        		
//        		}
//   			 }
//   			 
//   			}else{
//   			
//   				answerCol[arr['Name']].push(JSON.parse('{"'+$(this).attr("name")+'":"'+$(this).val()+'"}'));
//   			
//   			}
//   			//localStorage.setItem('ansObj', JSON.stringify(answerCol));
//   			console.log(JSON.stringify(answerCol));
//
// 	
// 	});
 	
 		//Remove tempararily local storage   
	//localStorage.removeItem('valObj');  
