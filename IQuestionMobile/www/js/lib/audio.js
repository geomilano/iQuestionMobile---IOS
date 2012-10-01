
	var valObject = localStorage.getItem('valObj');
	//console.log("full path : "+phonePath);
	var arr =JSON.parse(valObject);
	$("#displayquestion").show();
	
	temp ='';
	window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fs) {
    var directoryReader = fs.root.createReader();
    directoryReader.readEntries(function(entries) {
        var i;
        for (i=0; i<entries.length; i++) {
        	if(entries[i].name == arr['QAudio'] ){
	        	localStorage.setItem('audioFileExists', 'Y');				
	        }
        }
    }, function (error) {})
  }, function (error) {});
   
 
	if(localStorage.getItem('audioFileExists') == "Y"){ 	
		phonePath = phonePath.substring(7);			
		audiofile = phonePath+"/"+arr['QAudio'];
	}
	else{	
		var dl_url = "http://"+domain_url+"/ilink/projects/"+localStorage.getItem('survey_id')+"/"+arr['QAudio'];
		audiofile = dl_url;
	}
	console.log(audiofile);
	temp += '<div id="audioPosition"><input type="range" name="slider" id="slider" value="0" min="0" max="100" data-highlight="true" /></div>';
	temp += '<br/><div id="audioLabel"></div>';
	temp += '<div data-role="controlgroup" data-type="horizontal" class="ui-corner-all ui-controlgroup ui-controlgroup-horizontal"><div class="ui-controlgroup-controls">'; 
	temp += '<a href="#" id="play" data-role="button" data-icon="audio-play" data-iconpos="notext" data-theme="a" value="Play"></a>';
	temp += '<a href="#" id="stop" data-role="button" data-icon="audio-stop" data-iconpos="notext" data-theme="a" value="Stop"></a>';
	temp += '</div></div>';

	temp +='';	
	
	$("#displayquestion").html(temp);
	$("#displayquestion").trigger("create");

	//Remove tempararily local storage   
	localStorage.removeItem('valObj');   
	localStorage.removeItem('audioFileExists');	
	
  /** Load when the phonegap is ready **/
  document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		
		/* Set play function when play button is triggered*/
		$('#play').click(function(){
 		var names = $('#play').attr('value');
			if(names == 'Play'){
				console.log(audiofile);
				playAudio(audiofile);
				$('#play').attr('value','Pause');
				$('#play').attr('data-icon','audio-pause');
        $('#play').children().children().next().removeClass('ui-icon-audio-play').addClass('ui-icon-audio-pause');
			}else{
				pauseAudio();
				$('#play').attr('value','Play');
				$('#play').attr('data-icon','audio-play');
				$('#play').children().children().next().removeClass('ui-icon-audio-pause').addClass('ui-icon-audio-play');
			}
		});
		
		/* Set stop function when play button is triggered*/
		$('#stop').click(function(){
			stopAudio();
			// reset slider
			$('#slider').val(0);
			$('#slider').slider('refresh');
			
		  $('#pause').button('disable');
			$('#play').attr('value','Play');
			$('#play').attr('data-icon','audio-play');
			$('#play').children().children().next().removeClass('ui-icon-audio-pause').addClass('ui-icon-audio-play');
		});
		

	  var audiopos = 0 ;
	  /* Set audio slider when action is triggered */
		$('#audioPosition').bind('swiperight', function(){
			changeAudioPosition();
    });
    
    $('#audioPosition').bind('swipeleft', function(){			
			 changeAudioPosition();
    });
    
		$('#audioPosition').live('touchend', function() {
			changeAudioPosition();
		});
	}
	
	/** external functions **/
	
	/* Change the audio position when audio is swipe or click*/
	function changeAudioPosition(){
		audiopos = $("#slider").val();			 
		var duration = audio.getDuration();
		var position = audiopos/ 100 * Math.round(duration);
		pausePos = Math.round(position);
		pauseAudio();
		playAudio(audiofile);
	}
	