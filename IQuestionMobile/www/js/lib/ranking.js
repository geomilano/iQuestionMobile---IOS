
	var valObject = localStorage.getItem('valObj');
	var arr =JSON.parse(valObject);
	var arrAnswer={"q6_":[{"q6_1":"3"},{"q6_2":"1"},{"q6_3":"4"},{"q6_4":"2"}]};
	var answerCol={};
	answerCol[arr['Name']]=[];
	$("#question").html(arr["Query"]);
	$("#displayquestion").show();			
	$("#displayquestion").html(function(){
	
		var itemAt=0;
		
		temp += '<table id="maintbl">';
		$.each(arr['Items']['0']['info'], function(k, child) {
		
			if(arrAnswer[arr['Name']][itemAt][arr['Name']+child['value']]!=null){
			
			temp += '<tr><td>'+child['text']+'</td><td><input type="number" name="'+arr['Name']+child['value']+'" id="selectratinginput" data-mini="true" value="'+arrAnswer[arr['Name']][itemAt][arr['Name']+child['value']]+'" /></td></tr>';
			
			}else{
			
			temp += '<tr><td>'+child['text']+'</td><td><input type="number" name="'+arr['Name']+child['value']+'" id="selectratinginput" data-mini="true" /></td></tr>';
			
			}
			
			itemAt++;
		});
		temp += '</table>';
	
		 return temp;
	});		
	$("#displayquestion").trigger("create");
//	
//	$("#maintbl tr td input").blur(function(){
// 	
// 	console.log($(this).attr("name"));
// 	console.log($(this).val());
// 	
// 		if(answerCol[arr['Name']].length !== 0){
//				if(typeof k != 'undefined'){
//					delete k;
//				}
// 			for( var k = 0; k <answerCol[arr['Name']].length; k++ ) {
// 					
//        		if( $(this).val() != answerCol[arr['Name']][k][$(this).attr("name")] ) {
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
//   			
//   			console.log(JSON.stringify(answerCol));
//
// 	
// 	});
	
	//Remove tempararily local storage   
	//localStorage.removeItem('valObj');  