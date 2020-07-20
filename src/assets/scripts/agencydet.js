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
        var ref = firebase.database().ref("property owners/Agency/" +param);
        ref.once("value").then(function(snapshot) {
            var val = snapshot.val();
            console.log(val);
            var Name=val.AgencyName;
	        var email=val.email;
	        var phone=val.phone;
	        var aboutme=val.Description;
            var adres = val.address;
            var city = val.city;
	        var propertiesNumber=snapshot.child("property").numChildren();

	        $('#usernames').append('<header><h1 >'+Name+'</h1></header>');
	        document.getElementById('phne').innerHTML = phone;
	        document.getElementById('phnes').innerHTML = phone;
	        $('.useremail').append('<a href="mailto:'+email+'">'+email+'');
	        if (aboutme=="undefined") {
	        	document.getElementById('aboutme').innerHTML="";
	        }else{
	        	document.getElementById('aboutme').innerHTML=aboutme;
	        }
	        $('.countprop').append('<header><h3>My Properties ('+propertiesNumber+')</h3></header>');
            $('#me').append('<strong>'+Name+'</strong><br>'+
                                        ''+city+'<br>'+
                                        ''+adres+'');
	        

	    });
        var propertiesref= firebase.database().ref("users/" +param+ "/property/");
        propertiesref.once("value").then(function(snapshot){
	        $('.userpropert').html('');
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


                $('.userpropert')
                .append(
                    '<div class="col-md-4 col-sm-4">'+
                        '<div class="property">'+
                            '<ahref="property-detail.html?name='+key+'" >'+
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
                var ref = firebase.database().ref("users/" +uid);
                ref.once("value").then(function(snapshot) {
                    
                    var Fname=snapshot.val().FirstName;
				    var Lname=snapshot.val().LastName;
				    var Name=snapshot.val().AgencyName;
                
                
                    $('#review').on('submit', function (e) {
                        e.preventDefault();
                        
                        
                            var rating= $("#value1").val();
    
                            var data2={
                            review: $("#form_review1").val(),
                            ratedby: Fname +Lname ||Name
                            };
                            var datasave={
                                review: $("#form_review1").val(),
                                ratedby: Fname +Lname ||Name,
                                rating: $("#value1").val()
                            };
                        
    
                        // console.log(ratingdata);
                        if(param == uid){
                            window.alert("user cant rate him/herself");
    
                        }else{
                            var newKey = firebase.database().ref().child('Rates/'+param).push().key;
                            var db = firebase.database().ref();
                            db.child('Rates/'+param+ "/reviews/"+newKey).set(data2);
                            db.child('Rates/'+param+ "/rate/" +newKey).set({rating:rating});
                            db.child('users/' + param+ "/rating/" + newKey).set(datasave);
                            document.getElementById("review").reset();
                            window.location.reload(true); 
                        }
                
                    });
                });
            }else{
                $('#review').on('submit', function (e) {
                    e.preventDefault();
                    window.alert("Please Login to review");
                    
                    
            
                });
            }
    
        });
        var averagref = firebase.database().ref("Rates/" +param);
        averagref.limitToFirst(1).once("value").then(function(snapshot){
            
            snapshot.forEach(function(childSnapshot) {
                var vl = childSnapshot.child('val').val();
                
                var averagerate = Math.round(vl * 10) / 10;
                
                // total number of stars
                const starTotal = 5;
                const starPercentage = (averagerate / starTotal) * 100;
                const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
                console.log(starPercentageRounded);
                // document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded; 
                document.querySelector('.stars-inner').style.width = starPercentageRounded; 
                // document.getElementById('avgvalue').innerHTML ="avg: " +averagerate;
                
            });
        });
        var rates = firebase.database().ref('users/' + param+ "/rating/");
        
        rates.once("value").then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                vl = childSnapshot.val().rating;
                var key1 = childSnapshot.key;
                var revie = childSnapshot.val().review;
                var rater = childSnapshot.val().ratedby;
    
                // total number of stars
                const starTotal = 5;
                const starPercentage = (vl / starTotal) * 100;
                const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`; 
                
    
                            $("#testmonials").
                                append(
                                    '<aside>'+
                                    '<footer>'+rater +'</footer>'+
                                    '<p>'+revie+'</p>'+
                                    '<div class="stars-outer" style="font-size: 16px;">'+
                                    '<div class="stars-inner" id="inner"  style="width:'+starPercentageRounded+' ;"></div>'+
                                    '</div>'+
                                    
                                    '</aside>'
    
                                );
                            
                        
    
    
    
                    });
                });
        
        
        
    });