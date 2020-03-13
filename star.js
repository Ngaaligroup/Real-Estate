// import rater from 'rater-js';
$.getScript('assets/rater.js', function(){
	
	var myRating = {
		max: 5,
		starSize: 16,
		disableText: 'Thank you for your vote!',
		ratingText: '{rating}/{maxRating}',
		update_input_field_name:$("#value1"),
		isBusyText: null,
		step: 0.5,
		// reverse: false,
		// readOnly: false
		
		// element:document.querySelector("#rater"),
		// rateCallback:function rateCallback(rating, done) {
		//   this.setRating(rating);
		//   done();
		// }
	};
	$("#ratin").rate(myRating);
	
	var avgrating={
		max: 5,
		starSize: 16,
		ratingText: '{rating}/{maxRating}',
		step: 0.5,
		readOnly: true

		// element:document.querySelector("#rater"),
		// rateCallback:function rateCallback(rating, done) {
		//   this.setRating(rating);
		//   done();
		// }
	};
	$("#avgrating").rate(avgrating);

	
});


		
	