import rater from 'rater-js';
var myRating = raterJs( {
	
		element:document.querySelector("#rater"),
		rateCallback:function rateCallback(rating, done) {
		  this.setRating(rating);
		  done();
		}
	});
	var myRating = raterJs({
		
		
			max: 5,
			starSize: 16,
			disableText: 'Thank you for your vote!',
		    ratingText: '{rating}/{maxRating}',
			isBusyText: null,
	
			step: undefined,
		
			reverse: false,
				readOnly: false
		});
		
	