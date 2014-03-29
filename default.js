//overwrite array prototype
// attach the .compare method to Array's prototype to call it on any array
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}


$(function(){

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
	  html: '<h6 class="uiHeaderTitle">Marketplace</h6>',
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
	var inputBox = $('#u_0_1s');

	//add event to input box
	inputBox.on('click', function(){
		//watch for hashtag 
		var textarea = $('.mentionsTextarea');
		//#fbmarketplace
		var hashtagQueue = [35,102,98,109,97,114,107,101,116,112,108,97,99,101];
		var hashPositions = [];
		var currentHash = [];

		textarea.keypress(function(e){
			currentHash.push(e.which);
			if(e.which === 35){ //start hashtag (entered hashtag)
				var index = textarea.val().length;
				console.log('index: ', index);
				hashPositions.push(index);
				console.log(hashPositions);
			}else if(e.which === 32){//end of hashtag (entered spacebar)
				console.log('spacebar');
				console.log('currentHash: ', currentHash);
				//check hashtags?
				if(hashPositions.length>0){ //there's a hashtag
					var tmp = hashtagQueue.slice(0);
					//can we possible have #fbmarketplace?
					var remaingOffset = textarea.val().length - hashPositions[0];
					console.log('remaingOffset', remaingOffset);
					if(remaingOffset === hashtagQueue.length){
						var equal = currentHash.compare(hashtagQueue);
						console.log('are they the same?', equal)
					}//end if possible tag
					else{
						hashPositions.pop();
					}
					
				}//hashPositions.length>0

				
			};

		})
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
			  }
			});
			mpbutton.on('click', function(){
				//clicked
				console.log("clicked");
				//show title input
				var inputTitle = $('<input>', {
				  id: 'FbMarketplace-title',
				});
				//get input box
				var inputB = $('.uiTypeahead');
				//append title below inputbox
				inputTitle.appendTo(inputB);
				var inputWrapper = $('#u_4_1');
				inputWrapper.css('display', 'block');
			});
			mpbutton.prependTo(actionBar);
		}
		
		//allow to show title of post
		
		
		
		//buttons will appear, insert marketplace button


	});

	 

};

var fbmp = new FbMarketplace();	

});
