//overwrite array prototype
// attach the .compare method to Array's prototype to call it on any array

$(function(){

function addtagbutton(){
		//if hashtag is typed button will be added
		//get FB actionBar
		var actionBar = $("._1dsp._4-");
		//only append fbMp button if it doesn't already exists
		var ourButton = $('#tagFbMarketplace');
		
		if(ourButton.length !== 1){
			var mpbutton = $('<div>', {
			  id: 'tagFbMarketplace',
			  class: 'lfloat',
			  css:{
			    'cursor': 'pointer'
			  },
			  
			});
			mpbutton.on('click', function(){
				//show title input
				var inputTitle = $('<input>', {
				  id: 'FbMarketplace-title',
				  placeholder: 'What are you selling?',
				  class: 'inputtext textInput DOMControl_placeholder'
				});
				//get input box
				var inputB = $('.uiTypeahead');
				//append title below inputbox
				inputTitle.appendTo(inputB);
				var inputWrapper = $('#u_4_1');
				inputWrapper.css('display', 'block');

				//add event handler for post button
				var buttonPost = $('._42ft._4jy0._11b._4jy3._4jy1.selected');
				buttonPost.on('click', function(){
					var fbmpItemwrapper = $('<div>', {
					  class: 'item-wrapper',
					  css:{
					    'cursor': 'pointer'
					  }
					});

					var fbmpItemTitle = $('<span>', {
					  class: '_5v0s',
					  html: '<span class="_5my8">iPad Retina $250</span><span class="_5v9v"> I am selling my iPad retina, brand new! </span>'
					});

					var t = $('#fbmpnav-title');
					var title = $('#FbMarketplace-title').val();
		
					fbmpItemwrapper.append(fbmpItemTitle);
					fbmpItemwrapper.insertAfter(t);
				
					
				});
			});
			mpbutton.prependTo(actionBar);
		}
}

function FbMarketplace(){
	/*
	 * insert market place wrapper
	 */
	var rightbar = $('#pagelet_reminders');
	var mpwrapper = $('<div>', {
	  id: 'FbMarketplace',
	  css:{
	    'cursor': 'pointer'
	  }
	});

	var title = $('<div>', {
	  class: 'uiHeader uiHeaderTopBorder mbm pbs uiSideHeader',
	  html: '<h6 class="uiHeaderTitle" id="fbmpnav-title">Marketplace</h6>',
	  css:{
	    'cursor': 'pointer'
	  }
	});
	mpwrapper.append(title);
	mpwrapper.insertAfter(rightbar);

	/*
	 * insert market button
	 */
	//get status input box
	var inputBox = $('.mentionsTextarea');
	//#fbmarketplace
	var hashtagQueue = [102,98,109,97,114,107,101,116,112,108,97,99,101];
	var hashPositions = [];
	var currentHash = [];
	//add event to input box
	inputBox.on('click', function(){
		
		//watch for hashtag 
		var textarea = $('.mentionsTextarea');
		

		textarea.keypress(function(e){
			
			if(e.which === 35){ //start hashtag (entered hashtag)
				currentHash.push(e.which);
				var index = textarea.val().length;
				//console.log('index: ', index);
				hashPositions.push(index);
				//console.log(hashPositions);
			}else if(e.which === 32){//end of hashtag (entered spacebar)
				addtagbutton();
				//console.log('spacebar');
				//console.log('currentHash: ', currentHash);
				//check hashtags?
				if(hashPositions.length>0){ //there's a hashtag
					var tmp = hashtagQueue.slice(0);
					//can we possible have #fbmarketplace?
					var remaingOffset = (textarea.val().length-1) - hashPositions[0];
					//console.log('remaingOffset', remaingOffset);
					if(remaingOffset === hashtagQueue.length){
						//var equal = currentHash.compare(hashtagQueue);
						//console.log('are they the same?', equal)
					}//end if possible tag
					else{
						hashPositions.pop();
					}
					
				}//hashPositions.length>0

				
			};

		});

		


	});

	 

};

var fbmp = new FbMarketplace();	

});
