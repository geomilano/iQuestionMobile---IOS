	$.getScript("js/video.js");
	var valObject = localStorage.getItem('valObj');

	var arr =JSON.parse(valObject);
	$("#displayquestion").show();
	$("#question").html(arr["Query"]);
	temp ='';
	window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fs) {
    var directoryReader = fs.root.createReader();
    directoryReader.readEntries(function(entries) {
        var i;
        for (i=0; i<entries.length; i++) {
        	if(entries[i].name == arr['QVideo'] ){
	        	localStorage.setItem('videoFileExists', 'Y');				
	        }
        }
    }, function (error) {})
  }, function (error) {});

	if(localStorage.getItem('videoFileExists') == "Y"){ 				
		videofile = phonePath+'/'+arr['QVideo'];
	}
	else{	
		var dl_url = "http://"+domain_url+"/ilink/projects/"+localStorage.getItem('survey_id')+"/"+arr['QVideo'];
		videofile = dl_url;
	} 

	temp += '<br/><div >	<a href="javascript:void(0);" data-role="button" onClick="playVideo(\''+videofile+'\');">Play Video</a></div>';
	temp +='';	
	$("#displayquestion").html(temp);
	$("#displayquestion").trigger("create");

	//Remove tempararily local storage   
	localStorage.removeItem('valObj');   
	localStorage.removeItem('videoFileExists');	
	 
	/* Play Video*/
	function playVideo(videofile){
		window.plugins.videoPlayer.play(videofile);
	}
	