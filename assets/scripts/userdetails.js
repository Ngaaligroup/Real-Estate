$(document).ready(function(){
  
function getUrlParam(param)
            {
              param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
              var regex = new RegExp("[?&]" + param + "=([^&#]*)");
              var url   = decodeURIComponent(window.location.href);
              var match = regex.exec(url);
              return match ? match[1] : "";

              
            }
        var param = getUrlParam("name");
        var ref = firebase.database().ref("users/" +param);
        ref.once("value").then(function(snapshot) {
            var val = snapshot.val();
            console.log(val);
            var Fname=snapshot.val().FirstName;
	        var Lname=snapshot.val().LastName;
	        var email=val.email;
	        var phone=val.phone;
			var aboutme=val.AboutMe;
			var ProfilePic=val.ProfilePic;
      		// var company=childSnapshot.val().company;
	        var propertiesNumber=snapshot.child("property").numChildren();

	        $('#usernames').append('<header><h1 >'+Fname+' '+Lname+'</h1></header>');
	        document.getElementById('phne').innerHTML = phone;
	        document.getElementById('phnes').innerHTML = phone;
	        $('.useremail').append('<a href="mailto:'+email+'">'+email+'');
	        if (aboutme=="undefined") {
	        	document.getElementById('aboutme').innerHTML="";
	        }else{
				// document.getElementById('aboutme').innerHTML="aboutme";
				
			}
			if(ProfilePic == "undefined"){
				$('#profilepic').append('<img  alt="" src="assets/img/agent-01.jpg"></img>');
				
			}else{
				$('#profilepic').append('<img  alt="not found" src="'+ProfilePic+'" onerror=this.src="assets/img/agent-01.jpg"></img>');
			}
	        $('.countprop').append('<header><h3>My Properties ('+propertiesNumber+')</h3></header>');
	        

	    });
	    var propertiesref= firebase.database().ref("users/" +param+ "/property/");
	    propertiesref.once("value").then(function(snapshot){
	    	$('#userpropert').html('');
	    	snapshot.forEach(function(childSnapshot) {
	    	
		    	var vl = childSnapshot.val();
		    	var key = childSnapshot.key;
		    	

		    	var Title=vl.Title;
		        var Address=vl.Address;
		        var Area=vl.Area;
		        var description=vl.Description;
		        var price=vl.Price;
		        var Land_Type=vl.Land_Type;
		        var Photos=vl.Photos;
		        var Status=vl.Status;
		        var bed=vl.Beds;
		        var baths=vl.Bathrooms;
		        var garage=vl.Garages;

		        


		    	$('#userpropert')
		    	.append(
		    		'<div class="col-md-4 col-sm-4">'+
	                    '<div class="property">'+
	                        '<a href="property-detail.html?name='+key+'" >'+
	                            '<div class="property-image">'+
	                                '<img alt="" src="'+Photos+'">'+
	                            '</div>'+
	                            '<div class="overlay">'+
	                                '<div class="info">'+
	                                    '<div class="tag price">UGX '+price+'</div>'+
	                                    '<h3>'+Title+'</h3>'+
	                                    '<figure>'+Address+'</figure>'+
	                                '</div>'+
	                                '<ul class="additional-info">'+
	                                    '<li>'+
	                                        '<header>Area:</header>'+
	                                        '<figure><span >'+Area+ '</span>m<sup>2</sup></figure>'+
	                                    '</li>'+
	                                    '<li>'+
	                                        '<header>Beds:</header>'+
	                                        '<figure>'+bed+'</figure>'+
	                                    '</li>'+
	                                    '<li>'+
	                                        '<header>Baths:</header>'+
	                                        '<figure>'+baths+'</figure>'+
	                                    '</li>'+
	                                    '<li>'+
	                                        '<header>Garages:</header>'+
	                                        '<figure>'+garage+'</figure>'+
	                                    '</li>'+
	                                '</ul>'+
	                            '</div>'+
	                        '</a>'+
	                    '</div>'+
	                '</div>'
		    		);
		    });
		});
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {

			var uid = user.uid;
			
			$('#review').on('submit', function (e) {
				e.preventDefault();
				
				var ratingdata = {
					rating: $("#value1").val(),
					review: $("#form_review1").val(),
					ratedby: uid
				};

				// console.log(ratingdata);
				if(param == uid){
					window.alert("user cant rate him/herself");

				}else{
				var db = firebase.database().ref();
				db.child('Rates/'+param ).push(ratingdata);
				document.getElementById("review").reset();
				}
		
			});
		}else{
			$('#review').on('submit', function (e) {
				e.preventDefault();
				window.alert("Login to review");
				
				
		
			});
		}

	});
	
	
	
});
