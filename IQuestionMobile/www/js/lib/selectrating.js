var valObject = localStorage.getItem('valObj');
	console.log(valObject );
	 var arr =JSON.parse(valObject);
	 var ansSeq=new Array();
	 var checkPass=" ";
	 var i=0;
	 $("#question").html(arr["Query"]);
	$("#displayquestion").show();			
	$("#displayquestion").html(function(){
	
		
		//temp += '<table id=selectrat><tbody><tr>';
		//$.each(arr['Items']['0']['info'], function(k, child) {
			//temp += '<td id=selectrat><div id=options>'+child['text']+'</div></td>';
			/*+'</td><td><input type="number" name="'+arr['Name']+child['value']+'" id="selectratinginput" data-mini="true" /></td></tr>'*/;
		//});
		//temp += '</tr></tbody></table>';
		
		/*temp += '<div id=selectrat>';
		$.each(arr['Items']['0']['info'], function(k, child) {
			temp += '<div class="options"><table width="40" height="40" border="1"><tr><td >'+child['text']+'<input type="hidden" name="passed" value="'+child['text']+'"/>';
			temp += '</td></tr></table></div>';
			/*+'</td><td><input type="number" name="'+arr['Name']+child['value']+'" id="selectratinginput" data-mini="true" /></td></tr>'*/;
		});
		temp += '</div>';
		temp += '<span id="checkPs"></span>';
		
		$('#selectrat .options').click(function() {
			$(this).hide();
 			 
		});*/
		
		temp += '<div id="questions"></div>';
		temp += '<div id="selratopt">';
		
		for(i=0; i <= 1; i++){
				if(arr['Items'][i]['coordinate'] == 'x'){
					
					$.each(arr['Items'][i]['info'], function(k, child) {						
							temp += '<div class="opts">'+child['text']+"</div>";						
					});	
					
				}
			}
		
		
		
		temp += '</div>';
		
	
		
		
		
		 return temp;
	});		
	$("#displayquestion").trigger("create");
	
	$('#selectrat .options').click(function() {
			$(this).hide();
 			 //$('#target').click();
 			 
 			 ansSeq[i]=$(this).find( 'input[name="passed"]' ).val();
 			 
 			 for(var j=0;j<ansSeq.length;j++){
				checkPass+="<b>ansSeq["+j+"] is </b>=>"+ansSeq[j]+"<br>";
			 }
 			 
 			 i=i+1;
		});
	
	//Remove tempararily local storage   
	localStorage.removeItem('valObj');
	
	  