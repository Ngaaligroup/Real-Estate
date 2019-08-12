$(document).ready(function(){
	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyAwrdWBHcMo6xlvUp0qAavF5osGKMrFfNc",
	authDomain: "real-estate-9882c.firebaseapp.com",
	databaseURL: "https://real-estate-9882c.firebaseio.com",
	projectId: "real-estate-9882c",
	storageBucket: "real-estate-9882c.appspot.com",
	messagingSenderId: "1077907462804",
	appId: "1:1077907462804:web:bd7b165973428aa6"
	};
	
	firebase.initializeApp(config);

	//create firebase references
  	var Auth = firebase.auth(); 
  	var dbRef = firebase.database();
  	var agencyRef = dbRef.ref('agencies')
  	var usersRef = dbRef.ref('users')
  	// var auth = null;

  	//Register account
  	$('#form-create-account').on('submit', function (e) {
	    e.preventDefault();
	    
	    var acc = {
	         
	         
	         FirstName : $('#create-account-first-name').val(),
	         LastName : $('#create-account-last-name').val(),
	         email : $('#form-create-account-email').val(),
	         phone : $('#create-account-phone').val(),
	         Id : $('#create-account-nin').val(),
	         company : $('#create-company').val(),
	         address : $('#create-adress').val(),
	         profession : $('#create-proffesion').val(),
           
	         
	        };
	    var pass ={
            password : $('#create-account-password').val(),
            cpassword : $('#create-account-confirm-password').val(),

        }
      var usertype =  $("input[name='account-type']:checked").val();
      if (usertype ==="seller") {
        
        acc = Object.assign({isAdmin: true}, acc)

      }else{
        
        acc = Object.assign({isAdmin: false}, acc)
      }
        
	    if( acc.email != '' && pass.password != ''  && pass.cpassword != '' ){
	      if( pass.password == pass.cpassword ){
	        //create the user
	        
	        firebase.auth()
	          .createUserWithEmailAndPassword(acc.email, pass.password)
	          .then(function(user){
	            //now user is needed to be logged in to save data
	            auth = user;
              document.getElementById("form-create-account").reset();
	            //now saving the profile data
              var uid = firebase.auth().currentUser.uid;
              console.log(usertype);
	            // firebase.database().ref('users/' + usertype + '/' + uid).set(acc)
              firebase.database().ref('users/' + uid).set(acc)
	              .then(function(){
	                console.log("User Information Saved:", uid);
	              })
              if (usertype=== "seller") {
                 firebase.database().ref('property owners/' + usertype + '/' + uid).set(acc)
               }else{
                //do nothing
               }
	            
	          })
	          .catch(function(error){
	            console.log("Error creating user:", error);
	           
	          });
	      } else {
	        //password and confirm password didn't match
          window.alert("passwords dont match");
	        console.log("passwords dont match");
	        // $('#messageModalLabel').html(spanText("ERROR: Passwords didn't match", ['danger']))
	      }
	    }  
  });

  //Register account
  $('#form-create-agency').on('submit', function (e) {
    e.preventDefault();
    
    var agency = {
        // email: $('#registerEmail').val(),
        AgencyName : $('#create-agency-title').val(),
        Description : $('#create-agency-description').val(),
        address : $("#create-agency-address").val(),
        
        license : $("#create-agency-license").val(),
        city : $("#create-agency-city").val(),
        postal : $("#create-agency-zip").val(),
        email : $("#create-agency-email").val(),
        phone : $("#create-agency-phone").val(),
        website : $("#create-agency-website").val(),
        isAdmin : true,
        };
    var passd ={
          password : $("#create-agency-password").val(),

      };
    if( agency.email != '' && passd.password != ''  ){
      //create the user
        
      firebase.auth()
        .createUserWithEmailAndPassword(agency.email, passd.password)
        .then(function(user){
          //now user is needed to be logged in to save data
          document.getElementById("form-create-agency").reset();
          auth = user;
          var uid = firebase.auth().currentUser.uid;
          
          firebase.database().ref("users/" + uid).set(agency)
            .then(function(){
              console.log("User Information Saved:", uid);
            })
          window.location.href = "index.html";
          //saving information to the property owners
          firebase.database().ref("property owners/seller" + uid).set(agency)
            .then(function(){
              console.log("success", uid);
            })
            
        })
        .catch(function(error){
          console.log("Error creating user:", error);
           
        });
    } 
    });

  //Login
  $('#form-sign-in').on('submit', function (e) {
    e.preventDefault();
    if( $('#account-email').val() != '' && $('#account-password').val() != '' ){
      //login the user
      
      email= document.getElementById('account-email').value;
      password= document.getElementById('account-password').value;
      var data = {
        // TODO: check for real emails
        email: $('#account-email').val(),
        password: $('#account-password').val()
      };
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          console.log("Login Failed!", error);
        })
        .then(function(authData) {
          auth = authData;
          window.location.href = "index.html";
          console.log("success");
          document.getElementById("form-sign-in").reset();
        });
        
    }
  });

  $('#sign-out').on('click', function(e) {
    e.preventDefault();
    firebase.auth().signOut()
    window.location.href = "sign-in.html";
  });

  // //save contact
  // $('#contactForm').on('submit', function( event ) {  
  //   event.preventDefault();
  //   if( auth != null ){
  //     if( $('#name').val() != '' || $('#email').val() != '' ){
  //       contactsRef.child(auth.uid)
  //         .push({
  //           name: $('#name').val(),
  //           email: $('#email').val(),
  //           location: {
  //             city: $('#city').val(),
  //             state: $('#state').val(),
  //             zip: $('#zip').val()
  //           }
  //         })
  //         document.contactForm.reset();
  //     } else {
  //       alert('Please fill at-lease name or email!');
  //     }
  //   } else {
  //     //inform user to login
  //   }
  // });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
         var uid = user.uid;
         console.log(uid);
          // User is signed in.
         // var username =firebase.auth().currentUser.displayName;
         $(".promoted").hide();
         signout= document.getElementById('sign-out');
         signout.classList.remove('hide');

         signed=document.getElementById('sign-in');
         signed.classList.add('hide');

         $('.actions').before('<span class="user-name" style="color:#1396e2;" style="font-weight:bold;">   Hello , '+user.email+' !!</span>');
          
        } else {
          // No user is signed in.
          console.log("no user");
          signout= document.getElementById('sign-out');
          signout.classList.add('hide');

          signed=document.getElementById('sign-in');
          signed.classList.remove('hide');
        } 
  });

  $('#submit-property-type').change(function(){
    if(this.value == "Land"){
        // $('#prd_damount1').prop('readonly',true);
        $('#submit-Baths').prop('readonly', true);
        $('#submit-Beds').prop('readonly', true);
        $('#submit-state').prop('disabled', true);
        $('#submit-garages').prop('readonly', true);
     } else{
      // $('#prd_damount1').prop('readonly',false);
   }
  }).change();

  // submiting properties to database nodes
  $('#form-submit-property').on('submit', function( event ) { 
    event.preventDefault();
    

    var user = firebase.auth().currentUser;
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var file = $("#file-upload")[0].files[0];
    var newLandKey = firebase.database().ref().child('Land').push().key;
    var newhouseKey = firebase.database().ref().child('House').push().key;
    // var downloadURL;
    // var title = $("#title").val();
    // var comments = $("#comments").val();
    // Create a reference to 'images'
    var today = new Date().toLocaleDateString();
    var time =firebase.database.ServerValue.TIMESTAMP;


    
    
      
    var propertyhouse={
      Title: $('#submit-title').val(),
      Price: $('#submit-price').val(),
      Description: $('#submit-description').val(),
      PropertyType: $('#submit-property-type').val(),
      Status: $('#submit-status').val(),
      State: $('#submit-state').val(),
      Beds: $('#submit-Beds').val(),
      Bathrooms: $('#submit-Baths').val(),
      Area: $('#submit-area').val(),
      Garages: $('#submit-garages').val(),
      Address: $('#address-map').val(),
      Latitude: $('#latitude').val(),
      Longitude: $('#longitude').val(),
      Photos: "",
      Date: today,
      TimeOn :time
      
      
    };
    var propertyland={
      Title: $('#submit-title').val(),
      Price: $('#submit-price').val(),
      Description: $('#submit-description').val(),
      Status: $("#submit-status").val(),
      Area: $('#submit-area').val(),
      Land_Type: $("#submit-land-type").val(),
      Address: $('#address-map').val(),
      Latitude: $('#latitude').val(),
      Longitude: $('#longitude').val(),
      Photos: "",
      Date: today,
      TimeOn :time
      
      
      };

    
    // if( auth != null ){
      //create property
      if($('#submit-title').val() != ''){
        if ($('#submit-property-type').val() =="Land") {
          // TODO: submit land properties
          var db = firebase.database().ref();
          // db.child('users/' + user.uid + "/property/land/" + newLandKey).set(propertyland);
          db.child('properties/Land/' + newLandKey).set(propertyland);
          db.child('users/' + user.uid + "/property/" + newLandKey).set(propertyland);
          db.child('AllProperty/' + newLandKey).set(propertyland);


        }else{

          // TODO: submit other properties
          var db = firebase.database().ref();
          db.child('properties/house/' + newhouseKey ).set(propertyhouse);
          db.child('users/' + user.uid + "/property/" + newhouseKey).set(propertyhouse);
          db.child('AllProperty/' + newhouseKey).set(propertyhouse);
        }


        if ($("#file-upload").get(0).files.length != 0) {
          var storage = firebase.storage();
          var storageRef = storage.ref();
          var file = $("#file-upload")[0].files[0];
          var imgRef = storageRef.child(user.uid + "/" + newLandKey+ "/properties/" + file.name);
          var upload = imgRef.put(file).then(function(snapshot){
            snapshot.ref.getDownloadURL().then(function(url) {
              if ($('#submit-property-type').val() =="Land") {
                // TODO: submit land pictures
                var db = firebase.database().ref();
                db.child('properties/Land/' +  newLandKey).update({Photos: url});
                db.child('users/' + user.uid + "/property/land/" + newLandKey).update({Photos: url});
              }else{
                var db = firebase.database().ref();
                db.child('properties/house/' + newhouseKey ).update({Photos: url});
                db.child('users/' + user.uid + "/property/house/" + newhouseKey).update({Photos: url});
              }
            });
          });
        }else{
          console.log("No files selected.");
          window.alert("please add atleast one picture of your property");
        }

      }else{
        // TODO: title can not be null
        window.alert("please fill all neccessary fields");
      }
      
  });
  
  // /////////////////////////////////////////////////////////////
  //                                                            //
  //  RETRIEVE  DATA AND POPULATING IT                          //
  //                                                            //
  // /////////////////////////////////////////////////////////////





});



