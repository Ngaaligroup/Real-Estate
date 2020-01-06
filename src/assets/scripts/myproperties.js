$(document).ready(function(){
	firebase.auth().onAuthStateChanged(function(user) {
	    if (user) {
	         var uid = user.uid;
	         console.log(uid);

			// var uid = firebase.auth().currentUser.uid;
			var ref = firebase.database().ref("users/" +uid+ "/property/");
			ref.once("value").then(function(snapshot){
		    	$('#tts').html('');
		    	snapshot.forEach(function(childSnapshot) {
		    		var vl = childSnapshot.val();
			    	var key = childSnapshot.key;
			    	console.log(vl);

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
			        var date=vl.Date;
			        

			        $('#tts').
			        append(
			        	'<tr>'+
			                '<td class="image">'+
			                    '<a href="property-detail.html?name='+key+'"><img alt="property picture" src="'+Photos+'"></a>'+
			                '</td>'+
			                '<td><div class="inner">'+
			                    '<a href="property-detail.html?name='+key+'"><h2>'+Title+'</h2></a>'+
			                    '<figure>'+Address+'</figure>'+
			                    '<div class="tag price">UGX '+price+'</div>'+
			                '</div>'+
			                '</td>'+
			                '<td>'+date+'</td>'+
			                '<td>236</td>'+
			                '<td class="actions">'+
			                    '<a href="#" class="edit" id="edits" ><i class="fa fa-pencil"></i>Edit</a>'+
			                    '<a href="#" id="deletes"><i class="delete fa fa-trash-o"></i></a>'+
			                '</td>'+
		            	'</tr>'

			        	);
			        $('#edits').click(function(key){
			        	window.open("editproperty.html?name="+key+"");
    
					});
					$('#deletes').click(function(key){
			        	ref.child(key).remove();
						firebase.database().ref("AllProperty").child(key).remove();

						
		            });


    
					});
			  //       function editss(key){
			        	

					// }
					// function deletess(key){
						
					// }
		    	
			});
		}else{
			window.alert("you not authorized");
		}
	});
});