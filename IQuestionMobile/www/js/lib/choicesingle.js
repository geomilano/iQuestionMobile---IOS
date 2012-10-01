  var valObject = localStorage.getItem('valObj');
   var answerCol={};
	$("#displayquestion").show();					
	    var arr =JSON.parse(valObject);
	     var arrAnswer='{"q1_":"2"}';
	     arrAnswer=JSON.parse(arrAnswer);
	     $("#question").html(arr["Query"]);
			temp ='<fieldset id="field" data-role="controlgroup">';
			$.each(arr['Items']['0']['info'], function(k, child) {
			
				if(arrAnswer[arr['Name']]==child['value']){
				temp += '<input type="radio" id="radio-choice-'+child['value']+'" name="'+arr['Name']+'" value="'+child['value']+'" checked="checked"  />';
			  temp += '<label for="radio-choice-'+child['value']+'">'+child['text']+'</label>';
			  
				}else{
				temp += '<input type="radio" id="radio-choice-'+child['value']+'" name="'+arr['Name']+'" value="'+child['value']+'" />';
			  temp += '<label for="radio-choice-'+child['value']+'">'+child['text']+'</label>';
			  }
			});	
			temp +='</fieldset>';		
			
	
		$("#displayquestion").html(temp);
	
	$("#displayquestion").trigger("create");
	
//	$('#field input').click(function(){
//	
//	//	console.log($(this).val());
//	
//		answerCol=JSON.parse('{"'+arr['Name']+'":"'+$(this).val()+'"}');		
//		var qname = arr['Name'];
//		answerResponses[qname] = answerCol;
//		
//	  alert( JSON.stringify(answerResponses));
//	 
//	});


	//Remove tempararily local storage
	//localStorage.removeItem('valObj');

	

