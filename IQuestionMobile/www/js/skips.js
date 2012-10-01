
	var valObject = localStorage.getItem('valObj');
	var answerRes =  localStorage.getItem('answerResponses');
	var arr = JSON.parse(valObject);
	var fullobj = JSON.parse(retrievedObject)
	var q_str;

	if(arr['Skips'].length > 0){
		if(typeof k != 'undefined'){
			delete k;
		}
		if(typeof key != 'undefined'){
			delete key;
		}
		$.each(arr['Skips'], function(k, child) {
			localStorage.setItem('prevQuest',child['altqnum']);		
				if(child['from'] == arr['Name']){

						//Member answer
						$.each(JSON.parse(answerRes), function(key, val) {
						
							var valarr =JSON.parse(val);
							
							$.each(valarr, function(a, b) {	
									var q_arr = a.split("_");
									q_str = q_arr[0]+"_";
									//Skips: selected
									if(child['type'] == "selected"){
										if((child['altqnum'] == q_str)){
											if(child['value'] == b){
												goQuestion(child['goto'],'','0','1');	
												return false;									
											}else{
												goQuestion(child['from'],'','0','1');
												return false;									
											}																
										}
									}
									//Skips: not selected
									if(child['type'] == "notselected"){
										console.log("welcome to "+ child['type']);
										console.log(child['altqnum'] +" == " + q_str);
										if((child['altqnum'] == q_str)){
											if(child['value'] != b){
												goQuestion(child['goto'],'','0','1');	
												return false;									
											}else{
												goQuestion(child['from'],'','0','1');
												return false;									
											}																
										}
									}
									
							});
							
								//Skips: selected All
								if(child['type'] == "selectedall"){
									if((child['altqnum'] == q_str)){					
										total_item = fullobj[q_str]['Items'][0]['count'];			
											
										if(total_item == JSON.parse(answerRes).length){
											
											goQuestion(child['goto'],'','0','1');				
											return false;					
										}else{
											
											goQuestion(child['from'],'','0','1');							
											return false;	
										}																
									}
								}
								
								//Skips: selected less than
								if(child['type'] == "selectedlessthan"){
									if((child['altqnum'] == q_str)){					
										total_item = fullobj[q_str]['Items'][0]['count'];			
											
										if(JSON.parse(answerRes).length < child['value']){
											goQuestion(child['goto'],'','0','1');				
											return false;					
										}else{
											goQuestion(child['from'],'','0','1');							
											return false;	
										}																
									}
								}
								
								//Skips: selected more than
								if(child['type'] == "selectedmorethan"){
									if((child['altqnum'] == q_str)){					
										total_item = fullobj[q_str]['Items'][0]['count'];			
											
										if(JSON.parse(answerRes).length > child['value']){
											goQuestion(child['goto'],'','0','1');				
											return false;					
										}else{
											goQuestion(child['from'],'','0','1');							
											return false;	
										}																
									}
								}
								
						});
				}
		});
	}else{
		var curQuest = localStorage.getItem('curQuest');			
		goQuestion(curQuest,'','0','1');								
	}

	console.log("Skips end");