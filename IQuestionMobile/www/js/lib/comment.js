$.getScript("js/extra.js");
	var valObject = localStorage.getItem('valObj');
	var arrAnswer={"q4_":[{"q4_1":"test q4_1 "}]};
	var arr =JSON.parse(valObject);
	var answerCol={};
	$("#question").html(arr["Query"]);
	answerCol[arr['Name']]=[];
	var temp = "";
  $("#displayquestion").show();		
  $("#desc").show();		
  $("#desc").show('Please type your response');		

 	$("#displayquestion").html(function(){
 		
 		qName=arr['Name']+'1';
 		
 		console.log(qName);
 		
 		if(arrAnswer[arr['Name']][0][qName]!=null){
 		
 		temp +=' <textarea name="'+arr['Name']+'1" id="textarea">'+arrAnswer[arr['Name']][0][qName]+'</textarea>';
 		
 		}else{
 		
 		temp +=' <textarea name="'+arr['Name']+'1" id="textarea"></textarea>';
 		
 		}
 		 return temp;
 	});		
 	
 	$("#displayquestion").trigger("create");
 	
 	$("textarea").blur(function(){
 	
 	console.log($(this).attr("name"));
 	console.log($(this).val());
 	answerCol[arr['Name']]=(JSON.parse('{"'+$(this).attr("name")+'":"'+$(this).val()+'"}'));	
	console.log(JSON.stringify(answerCol));
 	

 	});
 	
 	
 		//Remove tempararily local storage   
	localStorage.removeItem('valObj');  
