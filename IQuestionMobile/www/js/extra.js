	/** extra.js :
				For external functions that use for iquestion mobile.
				Include $.getScript("js/extra.js");  at parent file that to call the function.
	**/
	$.getScript("js/phoneInfo.js");
	/* Download file when system detect media file. Placed at device cache folder */
		function download(downloadFile) {
		     var remoteFile = downloadFile;
		     var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
		     var localPath;
		     window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fileSystem) {
		         fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
		             localPath = fileEntry.fullPath;
		            
		             if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
		                 localPath = localPath.substring(7);
		             }
		             var ft = new FileTransfer();
		             ft.download(remoteFile,
		                 localPath, successdownload, faildownload);
		                 
		         }, faildownload);
		     }, faildownload);
		 }
    
    /* Success handler for download*/
		function successdownload(fileEntry){
		 	 localPath = fileEntry.fullPath;
       if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
          localPath = localPath.substring(7);
       }
       tmplocalpath = localPath;
       return tmplocalpath;
		 }
		
		/* Fail handler for download*/
		function faildownload(error) {
		   console.log(error.code);
		}
		
		/* Reset div when the page is changed or refresh*/
		function reset_div(){
			$("#desc").html("");
			$("#displayquestion").html("");

			if (audio) {
				audio.stop();
        audio.release();
			}
		}
		
		function goSurvey(survey_id){
			localStorage.setItem('survey_id', survey_id);		
			console.log('this is survey id'+survey_id);		
			window.location.href = "survey.html";
		}
		
		function gotFS(fileSystem) {
        fileSystem.root.getFile(survey_id+".json", {create: true}, gotFileEntry, fail); 
    	}

    	function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    	}
    	
    	function gotFileWriter(writer) {
        	writer.onwrite = function(evt) {
            	//console.log("write success");
        	};
        	//called from main.js
        	//console.log('writing'+questObj);
        	writer.write(questObj);
    	}
    	
    	function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            //console.log("Read as text");
            //console.log("Reading = "+evt.target.result);
            //retrievedObject=evt.target.result;
            
            retrievedObject= evt.target.result
        };
       
         reader.readAsText(file);
        
    	}
    	
    	function gotReadFS(fileSystem) {
        fileSystem.root.getFile(survey_id+".json", null, gotReadEntry, fail);
    	}
    	
    	
    	function gotFile(file){
        readAsText(file);
    	}
    	
    	function gotReadEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    	}
    	
			function removeFile(){
				
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
					fileSystem.root.getFile(survey_id+".json", null, function(file){
						file.remove(successdelete,faildelete);
					}, fail);
					
					
				});
			}
			
			function successdelete(){
				console.log('success delete file');
			}
			function faildelete(){
				console.log('unable delete file ');
			}			
    	function fail(error) {
        console.log(error.code);
    	}
		
		function getSurveyList(){
		//Get user phone number
		 window.plugins.phoneInfo.getmsisdn(function(pno) {
         localStorage.setItem('msisdn', pno);
     }, function() {
        //"Fail to get msisdn";
     });
     
     	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
     
     	var FS=fileSystem;
     	
      //Grab survey list from server
   		$.getJSON('http://'+localStorage.getItem("domain_url")+'/ilink/iquestion_mobile_api-1.0/index.php?p=getsurveylist&msisdn='+localStorage.getItem('msisdn'), function(data) {
				 
			    var str = "<ul data-role='listview' class='ui-listview'>";
				  var svy_str = 'surveys';
				  if(data['SurveyList']['TotalList'] <= 1) svy_str = 'survey';
					str += "<li data-role='list-divider'>Survey List : "+data['SurveyList']['TotalList']+ " "+svy_str+" </li>";
						
				  $.each(data['SurveyList']['Items'], function(key, val) {
				
				  	
				  	str += "<li><a href='javascript:void(0)' onClick='goSurvey(\""+val+"\");' data-transition='slide'>"+val+"<span id='dlstatus'></span></a>";
				  	//console.log('checkfile');
				  	FS.root.getFile(val+".json", null, function(){ dlstatus.innerHTML= "downloaded";}, function(){ dlstatus.innerHTML= " not downloaded ";});
				  	//console.log('endcheckfile'); 
				  	str += "</li>";
				  });
				  
				  str += "</ul>";
				  $('#displaylist').html(str);
		    	$("#displaylist").trigger("create");
			});
			
			} ,null);
			
			
			 
		}
		
	  function SendSupport(){
    	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    	var email = $('#email_support').val();
    	var message = $('#message_support').val();
    	var support_data = $('#supportemail').serialize();
    	var error = "-1";
    	
    	
	    	if(email == ""){
			    error ="1";
			    $('#returnmsg').html('<span style="color:red;">Email cannot be blank</span>');
			  }else if(reg.test(email) == false) {
			    error ="1";
			    $('#returnmsg').html('<span style="color:red;">Invalid email</span>');
			  }else if(message == ""){
					 error ="1";
					 $('#returnmsg').html('<span style="color:red;">Message cannot be blank</span>');
				}
	  		
	  		if( error !="1"){
	  				$('#returnmsg').html('');
	  				$.post("http://"+localStorage.getItem("domain_url")+'/ilink/iquestion_mobile_api-1.0/index.php?p=support',support_data,function(data){		
								if(data == 'ok'){
									$('#email_support').val('');
									$('#message_support').val('');
									alert("Your message has been sent to admin. Thank you.");
								}
						});	
	  		}
	      return false;
    }
	
	function redownload(){
		alert("redownload start");
		removeFile();
		getdata();
	}
		
		
