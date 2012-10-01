/* Initialize */
$('#prev').addClass('ui-disabled');
$('#next').addClass('ui-disabled');
var audiofile;
var tmplocalpath;
var phonePath;
var page; 
var answerResponses = new Array();
var domain_url = localStorage.getItem("domain_url");//"beta.completemr.com";
var survey_id = localStorage.getItem("survey_id");
var checked_res = "true";
document.addEventListener("deviceready", onDeviceReady, false);

/** System loaded when the phone is ready **/
	function onDeviceReady() {
		//Get phone path
		window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fs) {
			phonePath = fs.root.fullPath;
		});
		localStorage.removeItem('answerResponses');
		//Retrieve Survey from server
		getdata();
		$('#prev').removeClass('ui-disabled');
		$('#next').removeClass('ui-disabled');
		goQuestion("q1_",'','0','1');
	}
	

/** Function **/  

	//Question Fn Start
		 
	function getdata(){				
		  /* Load question from server
		     Demo Link: http://beta.completemr.com/ilink/mytest/index.php
		  */
		  
		  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            
            console.warn('Got FS premission');
            
      		fileSystem.root.getFile(survey_id+".json", null, function( ){ question.innerHTML="Loading survey..."},function(){
			$.getJSON('http://'+domain_url+'/ilink/iquestion_mobile_api-1.0/index.php?p=getsurvey&survey_id='+survey_id, function(data) {
				
				var lquestionObj = localStorage.getItem("questionObj");
				if(lquestionObj){
					localStorage.removeItem('questionObj');
				}				
			
				$.each(data['ProjectContent'], function(key, val) {
					if(val['Type'] == 'audio' || val['Type'] == 'video'){
							if(val['Type'] == 'audio'){
								media_file = val['QAudio'];
							}else{
								media_file = val['QVideo'];
							}
							
							/** Download to local if detect audio is available **/
							var dl_url = 'http://'+domain_url+"/ilink/projects/"+survey_id+"/"+media_file;
							download(dl_url);	

					}
				});
				
				//localStorage.setItem('questionObj', JSON.stringify(data['ProjectContent']));
				questObj=JSON.stringify(data['ProjectContent']);
				
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);	
						
			});	
			
			});		
			
			},null);
	}
	
	  function goQuestion(quest_num,loadtype,check_skip, display){
	 
			// Set Page
			if(quest_num != ""){
				page =quest_num;
			}
			// Set Navigation
			if(loadtype != ""){
				if(loadtype == "prev"){
					page = localStorage.getItem('prevQuest');
					console.log("prev + "+page);
				}
			}
			
			//Retrieve object from local Storage
			checkobj=  setInterval(function() {
				//var retrievedObject = localStorage.getItem('questionObj');
				//console.log('retrievedObject=  '+retrievedObject);
				localStorage.removeItem('questionObj');
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotReadFS, fail);
				
			   if(retrievedObject === null){
			   		getdata();
			   }else{			   
			   	if(typeof key != 'undefined'){
						delete key;
					}
				  clearInterval(checkobj);
				  reset_div();
				  $.each(JSON.parse(retrievedObject), function(key, val) {	
				  	
				  	if(page == key){
				  		localStorage.setItem('valObj', JSON.stringify(val));
				  		localStorage.setItem('curQuest', val['Name']);
				  	  
				  		if(check_skip == "1"){
				  			console.log("check SKIPS");
				  			$.getScript("js/skips.js");
				  		}
				  		if(display == '1'){
				  		
					  		if(page == 'q1_'){
						  		$('#prev').addClass('ui-disabled');
						  	}else{
						  		$('#prev').removeClass('ui-disabled');	
						  	}
					  	
					  		if(val["to"] == 'end'){
						  		$('#next').addClass('ui-disabled');
						  	}else{
						  		$('#next').removeClass('ui-disabled');
						  	}
		  					
		  					//Set Progress Bar
		  					$("#myProgressBar").progressbar({
			  					value: val['Percentage']
			  				});
			   
						  	//Display Question title
						  	//$("#question").html(val["Query"]);
						  	temp ="";	
						  	
						  	//Question Type : choicemultiple
						  	if(val['Type'] == "choicemultiple"){	  		
									$.getScript("js/lib/choicemultiple.js");
						  	}
						  	
						  	//Question Type : choiceopen
						  	if(val['Type'] == "choiceopen"){	  		
									$.getScript("js/lib/choiceopen.js");
						  	}
						  	
						  	//Question Type : comment
						  	if(val['Type'] == "comment"){	  		
									$.getScript("js/lib/comment.js");
						  	}
						  	
						  	//Question Type : intro
						  	if(val['Type'] == "intro"){	  		
									$.getScript("js/lib/intro.js");
						  	}
						  	
						  	//Question Type : singlecol
						  	if(val['Type'] == "singlecol"){	  		
									$.getScript("js/lib/singlecol.js");
						  	}
						  	
						  	//Question Type : multiplecheck
						  	if(val['Type'] == "multiplecheck"){	  		
									$.getScript("js/lib/multiplecheck.js");
						  	}						
					
						  	//Question Type : choicesingle
						  	if(val['Type'] == "choicesingle"){
										$.getScript("js/lib/choicesingle.js");
						  	}
						  	
						  	//Question Type : textinput
						  	if(val['Type'] == "textinput"){
									$.getScript("js/lib/textinput.js");
						  	}
						  	
						  	//Question Type : ranking
						  	if(val['Type'] == "ranking"){
									$.getScript("js/lib/ranking.js");
						  	}
						  	
						  		if(val['Type'] == "selectrating"){
									$.getScript("js/lib/selectrat.js");
						  	}
						  	
						  	//Question Type : audio
						  	if(val['Type'] == "audio"){
									$.getScript("js/lib/audio.js");
						  	}
						  	
						  	//Question Type : video
						  	if(val['Type'] == "video"){
									$.getScript("js/lib/video.js");
						  	}
						  	
						  	if(val['Type'] == "multiselectgrid"){
									$.getScript("js/lib/multiselectgrid.js");
						  	}
				  		}
				  		
					  }
					
				  });
			  }
			 }, 1000);
		
		}
		
		
		//Question Fn End
		
		
		//Answer Fn Start
		
		/*function getStoredAnswer(){				
		  
		  
		  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            
            console.warn('Got FS premission');
            
      		fileSystem.root.getFile(survey_id+"answer.json", null, function( ){//load answer},function(){ //Create answerfile});		
			
			},null);
	   }*/
		
		
					
		function submitAnswer(loadtype){
			// get answer 
			var curQuest = localStorage.getItem('curQuest');			
			//var retrievedObject = localStorage.getItem('questionObj');
			var ans = $("form").serializeArray();
			var err = "0";
			var nextQuest = "";
			var Qtype = "";
			$.each(JSON.parse(retrievedObject), function(key, val) {	
				 if(curQuest == key){				 	
				  	nextQuest =	 val['Next'];
				  	Qtype =	 val['Type'];				  		
				 }
			});
			var geo= 	ans.length;
				var ansArr = [];
				
		if(geo < 1){
			err = "1";
			localStorage.setItem('errMsg', "Opps, you must select an answer!");
			
		}else{
			for(var i=0; i < geo ; i++){
				$.each(ans[i], function(key, val) {	
					var keys=new Array();
					for(var y=0; y < geo ; y++){
								var res = ans[y]['name'].split("_"); 
								keys[y] = res[0]+"_";     
					}

					if(jQuery.inArray(curQuest,keys) == "-1"){
						localStorage.setItem('errMsg', "Oops! You have not made a selection. Please try again");
						err = "1";
					}else{
						var chkchild =  ans[i]['name'].indexOf(curQuest);
						
						if(chkchild == 0){
							var child =  ans[i]['name'].split("_");
							
							if((curQuest == child[0]+"_") && (ans[i]['value'] == "")){
								localStorage.setItem('errMsg', "Opps, please fill in the answer!");
								err = "1";
							}
						}
						
						else if((curQuest ==  ans[i]['name']) && (ans[i]['value'] == "")){
							localStorage.setItem('errMsg', "Opps, you must select an answer!");
							err = "1";
						}
						
					}
				});
			}
		}
			//proceed to next question
				
			if(err == "0"){
				if(typeof key != 'undefined'){
					delete key;
				}
				for(var i=0; i < geo ; i++){
			
					$.each(ans[i], function(key, val) {	
						ansArr[i] = '{"'+ans[i]['name']+'":"'+ans[i]['value']+'"}';
					});
				}
				localStorage.setItem('answerResponses',JSON.stringify(ansArr));
				
				$.getScript("js/checks.js",function(){
						localStorage.setItem('prevQuest',curQuest);
						if(checked_res == "true"){
							goQuestion(nextQuest,'','1','0');
						}
				});

				
			}else if(err == "1"){
				var errMsg = localStorage.getItem('errMsg');
				alert(errMsg);
			}
			
		}
		
		
		//Answer Fn End