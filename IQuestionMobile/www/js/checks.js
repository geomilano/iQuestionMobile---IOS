var valObject = localStorage.getItem('valObj');
var answerRes =  localStorage.getItem('answerResponses');
var arr = JSON.parse(valObject);
var curQuest = localStorage.getItem('curQuest');		
var chckstatus = "true";
if(arr['Checks'].length > 0){

	if(typeof k != 'undefined'){
		delete k;
	}
	if(typeof key != 'undefined'){
		delete key;
	}
	$.each(arr['Checks'], function(check_k, check_child) {
			var counter = 0;
			var total_selected = 0;
			//Member answer
			$.each(JSON.parse(answerRes), function(ans_k, ans_val) {
				
				var val_ansarr =JSON.parse(ans_val);
				
				var temp_arr = new Array();
				$.each(val_ansarr, function(check_quest, check_a) {	
					counter = parseInt(counter);
					
					//get total selected
					if(total_selected == 0){
						for(x in val_ansarr){
							total_selected++;
							alert(total_selected+"bbb");
						}
					}
					//
					//Check IsInteger
					//
					if(check_child['type'] == "isinteger"){
						var res = is_int(check_a);
						if(res === false){
							chckstatus = "false";
							alert(check_child['text']);
						}
					}
					
					//
					//Check IsNumeric
					//
					if(check_child['type'] == "isnumeric"){
						var res = is_numeric(check_a);
						if(res === true){
							chckstatus = "false";
							alert(check_child['text']);
						}
					}

					//
					//Check Exclusive
					//
					if(check_child['type'] == "exclusive"){
						
						if(check_a == "on"){
							var quest_val = check_quest.split("_"); 
							check_a = quest_val[1];    
							temp_arr[counter] = quest_val[1];    
						}
						if((check_child['value'] == check_a) && (temp_arr.length > 1)){
							chckstatus = "false";
							alert(check_child['text']);
						}
						
					}
					counter++;
					
					//
					//Check minselect
					//
					if(check_child['type'] == "minselect"){
						
					}
					//alert(arr['Items'][0]['count']);
					alert(total_selected+"aaa");
					
				});
			});
	});
	
		checked_res	 = chckstatus;
	  
}


//
// ALL FUNCTIONS WRITE HERE
//
function is_numeric(input){
    return isNaN(input);
}

function is_int(value){ 
   for (i = 0 ; i < value.length ; i++) { 
      if ((value.charAt(i) < '0') || (value.charAt(i) > '9')) return false 
    } 
   return true; 
}