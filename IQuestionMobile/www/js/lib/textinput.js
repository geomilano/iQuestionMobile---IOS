$.getScript("js/extra.js");
	var valObject = localStorage.getItem('valObj');

	var arr =JSON.parse(valObject);
	var temp = "";
	$("#question").html(arr["Query"]);
  $("#displayquestion").show();			
 	$("#displayquestion").html(function(){
  
		temp += checkExtra(arr);
		
 		temp +='<input type="text" name="'+arr['name']+'" id="basic" data-mini="true" />';
 		 return temp;
 	});		
 	
 	$("#displayquestion").trigger("create");
 	
 		//Remove tempararily local storage   
	localStorage.removeItem('valObj');  