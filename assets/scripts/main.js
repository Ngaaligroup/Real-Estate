$(document).ready(function(){
  
	// Initialize Firebase
	var config = {
  apiKey: "AIzaSyDFN2NFfgko7fBa4di1dv-EOhP1aNNok6k",
  authDomain: "realestates-b978c.firebaseapp.com",
  databaseURL: "https://realestates-b978c.firebaseio.com",
  projectId: "realestates-b978c",
  storageBucket: "realestates-b978c.appspot.com",
  messagingSenderId: "85338363199",
  appId: "1:85338363199:web:003d5846ea63720dd5af8a",
  measurementId: "G-XESFFT7YD4"
	};
	
	firebase.initializeApp(config);

	//create firebase references
  	var Auth = firebase.auth(); 
  	var dbRef = firebase.database();
  	var agencyRef = dbRef.ref('agencies');
  	var usersRef = dbRef.ref('users');


  	//Register account
  	$('#form-create-account').on('submit', function (e) {
	    e.preventDefault();

     
  
  	    var acc = {
  	         FirstName : $('#create-account-first-name').val(),
  	         LastName : $('#create-account-last-name').val(),
  	         email : $('#form-create-account-email').val(),
  	         phone : $('#create-account-phone').val(),
  	         company : $('#create-company').val(),
  	         address : $('#create-adress').val(),
  	         profession : $('#create-proffesion').val(),
             ProfilePic: "",
             usertype :  $("input[name='account-type']:checked").val(),
            };
            
  	    var pass ={
              password : $('#create-account-password').val(),
              cpassword : $('#create-account-confirm-password').val(),

          };
        var usertype =  $("input[name='account-type']:checked").val();
        
        if (usertype ==="seller") {
          
          acc = Object.assign({isAdmin: true}, acc);

        }else{
          
          acc = Object.assign({isAdmin: false}, acc);
        }
       
      
	    if( acc.email != '' && pass.password != ''  && pass.cpassword != '' ){
	      if( pass.password == pass.cpassword ){
	        //create the user
	        
	        firebase.auth()
	          .createUserWithEmailAndPassword(acc.email, pass.password)
	          .then(function(user){
	            //now user is needed to be logged in to save data
	            auth = user;
              var uid = firebase.auth().currentUser.uid;
              // window.location.href = "index.html";
              // document.getElementById("form-create-account").reset();
	           
              console.log(usertype);
              firebase.database().ref("users/" + uid).set(acc)
              .then(function(){
                // console.log("User Information Saved:", uid);
              });
              firebase.database().ref('Rates/'+uid+ "/average/").set({val:0});
              if (usertype=== "seller") {
                 firebase.database().ref("property owners/" + usertype + "/" + uid).set(acc)
                 .then(function(){
                  // console.log("success", uid);
                });
               
               }else if(usertype=== "professional"){
                 var profType = $('.prof1').val();
                 console.log(profType);
                 firebase.database().ref(usertype + "/" + profType + "/" + uid).set(acc)
                 .then(function(){
                  console.log("proffesional registered succsefully", uid);

                 });
               }
                var storage3 = firebase.storage();
                var storageRef3 = storage3.ref();
                var file1 = $(".profilepic")[0].files[0];
                var imgRef3 = storageRef3.child(uid + "/ProfilePic/" + file1.name);
                var upload1 = imgRef3.put(file1).then(function(snapshot){
                  snapshot.ref.getDownloadURL().then(function(url) {
                    var dbt  = firebase.database().ref();
                    dbt.child("users/" + uid).update({ProfilePic: url});
                    if (usertype=== "seller") {
                      var db = firebase.database().ref();
                      db.child("property owners/" + usertype + "/" + uid).update({ProfilePic: url});
                      
                    }else if(usertype=== "professional"){
                      var db6 = firebase.database().ref();
                      db6.child(usertype + "/" + profType + "/" + uid ).update({ProfilePic: url});
                    
                    }
                    // window.location.href = "index.html";
                    document.getElementById("form-create-account").reset();
                    
                  });
                });
              user.sendEmailVerification().then(function() {
                // Email sent.
                window.location.replace("confirmEmail.html");
              }, function(error) {
                // An error happened.
              });
              
            })
	          .catch(function(error){
              console.log("Error creating user:", error);
              console.log(error.message);
              window.alert( error.message);
              
	          });
	      } else {
          window.alert("Couldnt create user: passwords dont match");
	        // console.log("passwords dont match");
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
        ProfilePic: "",
        license : $("#create-agency-license").val(),
        city : $("#create-agency-city").val(),
        postal : $("#create-agency-zip").val(),
        email : $("#create-agency-email").val(),
        phone : $("#create-agency-phone").val(),
        website : $("#create-agency-website").val(),
        usertype: "Agency",
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
          // window.location.href = "index.html";
          
          auth = user;
          var uid = firebase.auth().currentUser.uid;
          
          firebase.database().ref("users/" + uid).set(agency)
            .then(function(){
              // console.log("User Information Saved:", uid);
            });
          firebase.database().ref('Rates/'+uid+ "/average/").set({val:0});
         
          //saving information to the property owners
          firebase.database().ref("property owners/Agency/" + uid).set(agency)
            .then(function(){
              
            });
            var storagep = firebase.storage();
            var storageRefp = storagep.ref();
            var filep = $(".agencypic")[0].files[0];
            var imgRefp = storageRefp.child(uid + "/ProfilePic/" + filep.name);
            console.log(imgRefp);
            var uploadp = imgRefp.put(filep).then(function(snapshot){
              snapshot.ref.getDownloadURL().then(function(url) {
                var dbp  = firebase.database().ref();
                dbp.child("users/" + uid).update({ProfilePic: url});
                dbp.child("property owners/Agency/" + uid).update({ProfilePic: url});
                document.getElementById("form-create-agency").reset();
                // window.location.replace("index.html#nocache");

              });
            });
          user.sendEmailVerification().then(function() {
            // Email sent.
            window.location.replace("confirmEmail.html");
          }, function(error) {
            // An error happened.
          });
            
        })
        .catch(function(error){
          console.log("Error creating user:", error);
          window.alert( error.message);
           
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
          window.alert( error.message);
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
    firebase.auth().signOut();
    // window.location.href = "sign-in.html";
    window.location.replace("sign-in.html#nocache");
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
         var uid = user.uid;
        //  console.log(uid);
          // User is signed in.
         $(".promoted").hide();
         signout= document.getElementById('sign-out');
         signout.classList.remove('hide');

         signed=document.getElementById('sign-in');
         signed.classList.add('hide');
         $('#act').append('<a href="profile.html"><span class="user-name" style="color:#1396e2;" style="font-weight:bold;">   Hello , '+user.email+' !!</span></a>');
         
         var usertypeRef= firebase.database().ref('users/'+uid);
         usertypeRef.once("value").then(function(snapshot) {
            
              var childData = snapshot.val();

              var userr= childData.isAdmin;
              console.log(userr);
              if (userr===true) {
                subm=document.getElementById('submitlin');
                subm.classList.remove('hide');
                $('.navbar-nav').
                append('<li><a href="my-properties.html" >My Properties</a></li>');
                console.log("is admin:" +userr);
                $('.navbar-nav').
                append('<li><a href="profileAdmin.html" >My Profile</a></li>');

                dcm=document.getElementById('adminhide');
                dcm.classList.add('hide');

                dcms=document.getElementById('adminhides');
                dcms.classList.add('hide');


              }else{
                subm=document.getElementById('submitlin');
                subm.classList.add('hide');
                console.log("is admin:" +userr);
                $('.navbar-nav').
                append('<li><a href="profile.html" >My Profile</a></li>');
                
              }
          });

          
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
    var today = new Date().toLocaleDateString();
    var time =firebase.database.ServerValue.TIMESTAMP;


    
    
      
    var propertyhouse={
      Title: $('#submit-title').val(),
      Price: $('#submit-price').val(),
      Description: $('#submit-description').val(),
      PropertyType: $('#submit-property-type').val(),
      Owner: user.uid,
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
      Owner:user.uid,
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
          var userdb= firebase.database().ref();
          db.child('AllProperty/' + newLandKey).set(propertyland);
          db.child('properties/Land/' + newLandKey).set(propertyland);
          db.child('users/' + user.uid + "/property/" + newLandKey).set(propertyland);
          


        }else{

          // TODO: submit other properties
          var dbo = firebase.database().ref();
          dbo.child('AllProperty/' + newhouseKey).set(propertyhouse);
          dbo.child('properties/house/' + newhouseKey ).set(propertyhouse);
          dbo.child('users/' + user.uid + "/property/" + newhouseKey).set(propertyhouse);
          
        }


        if ($(".propertypic").get(0).files.length != 0) {
          var storage2 = firebase.storage();
          var storageRef2 = storage2.ref();
          var file1 = $(".propertypic")[0].files[0];
          var imgRef = storageRef2.child(user.uid + "/" + newLandKey+ "/properties/" + file1.name);
          var upload = imgRef.put(file).then(function(snapshot){
            snapshot.ref.getDownloadURL().then(function(url) {
              if ($('#submit-property-type').val() =="Land") {
                // TODO: submit land pictures
                var db = firebase.database().ref();
                db.child('properties/Land/' +  newLandKey).update({Photos: url});
                db.child('users/' + user.uid + "/property/" + newLandKey).update({Photos: url});
                db.child('AllProperty/' + newLandKey).update({Photos: url});
                console.log("Photos:" +url);
              }else{
                var db6 = firebase.database().ref();
                db6.child('properties/house/' + newhouseKey ).update({Photos: url});
                db6.child('users/' + user.uid + "/property/" + newhouseKey).update({Photos: url});
                db6.child('AllProperty/' + newhouseKey).update({Photos: url});
                console.log("Photos:" +url);
                

              }
              window.location.href = "my-properties.html";
              // document.getElementById("form-submit-property").reset();
            });
          });

        }else{
          
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
// get land properties...
  var leadsRef = firebase.database().ref('properties/Land');
  leadsRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      
      //
      var Title=childSnapshot.val().Title;
    // alert(Title);
    var Address=childSnapshot.val().Address;
    var Area=childSnapshot.val().Area;
    var description=childSnapshot.val().Description;
    var price=childSnapshot.val().Price;
    var Land_Type=childSnapshot.val().Land_Type;
    var Photos=childSnapshot.val().Photos;
    var Status=childSnapshot.val().Status;

    $(".showprop").
    append(
      '<div class="property">' +
      '<figure class="tag status">'+Status+'</figure>' +  
      '<figure class="type" title="Land" id="type"><img src="assets/img/property-types/land.png" alt="propety"></figure>' +
      '<div class="property-image" >' +
          '<a href="property-detail.html?name='+key+'">' +
              '<img   alt="" src= "'+Photos+'"   >' +
          '</a>' +
      '</div>' +
      '<div class="info">' +
          '<header>' +
              '<a href="property-detail.html?name='+key+'"><h3>'+Title+'</h3></a>' +
              '<figure >'+Address+'</figure>' +
          '</header>' +
          '<div class="tag price" >UGX '+price+'</div>' +
          '<aside>' +
              '<p >'+description +'</p>' +
              
              '<dl>' +
                  '<dt>Status:</dt>' +
                  '<dd >'+Status+ '</dd>' +
                  '<dt>Area:</dt>' +
                  '<dd><span >'+Area+ '</span> m<sup>2</sup></dd>' +
                  

              '</dl>' +
          '</aside>' +
          '<a href="property-detail.html?name='+key+'" class="link-arrow">Read More</a>' +
      '</div>' +
    '</div>'
    );
    });
  
  });

    // index slider properties
  var leadRef = firebase.database().ref('AllProperty');
  leadRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      
      //
      var Title=childSnapshot.val().Title;
    // alert(Title);
    var Address=childSnapshot.val().Address;
    var Area=childSnapshot.val().Area;
    var description=childSnapshot.val().Description;
    var price=childSnapshot.val().Price;
    var Land_Type=childSnapshot.val().Land_Type;
    var Photos=childSnapshot.val().Photos;
    var Status=childSnapshot.val().Status;
    

    // $('.owl-carousel.homepage-slider.carousel-full-width').
    $('.homepage-slider').
    append(
      '<div class="slide" style="width: 544px; margin-right: 0px;">' +
        '<div class="container">' +
          '<div class="overlay">' +
              '<div class="info">' +
                  '<div class="tag price">UGX '+price+'</div>' +
                  '<h3>'+Title+'</h3>' +
                  '<figure>'+Address+'</figure>' +
              '</div>' +
              '<hr>' +
              '<a href="property-detail.html?name='+key+'" class="link-arrow">Read More</a>' +
          '</div>' +
        '</div>' +
        '<img alt="" src="'+Photos+'">' +
      '</div>');
    });
   
  });
  // retrieveing recent properties...
  var leadsRef3 = firebase.database().ref('AllProperty');
  leadsRef3.orderByChild("TimeOn").limitToLast(2).once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      
      //
      var Title=childSnapshot.val().Title;
    // alert(Title);
    var Address=childSnapshot.val().Address;
    var Area=childSnapshot.val().Area;
    var description=childSnapshot.val().Description;
    var price=childSnapshot.val().Price;
    var Land_Type=childSnapshot.val().Land_Type;
    var Photos=childSnapshot.val().Photos;
    var Status=childSnapshot.val().Status;
    

  $(".recent").
    append(
      '<div class="property small">' +
        '<a href="property-detail.html?name='+key+'">' +
            '<div class="property-image">' +
                '<img alt="" src="'+Photos+'">' +
            '</div>' +
        '</a>' +
        '<div class="info">' +
            '<a href="property-detail.html?name='+key+'"><h4>'+Title+'</h4></a>' +
            '<figure>'+Address+'</figure>' +
            '<div class="tag price">UGX '+price+  '</div>'  +
        '</div>' +
    '</div>'
    );
    });

    

  });

  //retrieving houses properties...
  // TODO: retrieving houses properties
  var houseref =firebase.database().ref('properties/house');
  houseref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var Title=childSnapshot.val().Title;
      // alert(Title);
      var Address=childSnapshot.val().Address;
      var Area=childSnapshot.val().Area;
      var description=childSnapshot.val().Description;
      var price=childSnapshot.val().Price;
      var Land_Type=childSnapshot.val().Land_Type;
      var Photos=childSnapshot.val().Photos;
      var Status=childSnapshot.val().Status;
      var bed=childSnapshot.val().Beds;
      var baths=childSnapshot.val().Bathrooms;
      var garage=childSnapshot.val().Garages;
      var state=childSnapshot.val().State;
      var propType= childSnapshot.val().PropertyType;
      
      $('.prophouse').
        append(
          '<div class="property">' +
            '<figure class="tag status">For Sale</figure>' +
            '<div class="propty">' +
              '<figure class="type" title="Apartment"><img src="" alt="property"></figure>' +
            '</div>'+
            '<div class="property-image">' +
                '<a href="property-detail.html?name='+key+'">' +
                    '<img alt="" src="'+Photos+'">' +
                '</a>' +
            '</div>' +
            '<div class="info">' +
                '<header>' +
                    '<a href="property-detail.html?name='+key+'"><h3>'+Title+'</h3></a>' +
                    '<figure>'+Address+'</figure>' +
                '</header>' +
                '<div class="tag price">UGX '+price+'</div>' +
                '<aside>' +
                    '<p>'+description+ '</p>' +
                    
                    '<dl>' +
                        '<dt>Status:</dt>' +
                            '<dd>'+Status+'</dd>' +
                        '<dt>Area:</dt>' +
                            '<dd><span >'+Area+ '</span> m<sup>2</sup></dd>' +
                        '<dt>Beds:</dt>' +
                            '<dd id="bedss">'+bed+'</dd>' +
                        '<dt>Baths:</dt>' +
                            '<dd id="bths">'+baths+'</dd>' +
                    '</dl>' +
                '</aside>' +
                '<a href="property-detail.html?name='+key+'" class="link-arrow">Read More</a>' +
            '</div>' +
          '</div>'
          );
      if (propType==="Apartment") {
        var srcappartment="assets/img/property-types/apartment.png";
        $('.propty').
          append(
            '<figure class="type" title="Apartment"><img src="'+srcappartment+'" alt=""></figure>' 
            );

      }else if(propType==="Hotel"){
        var srcHot="assets/img/property-types/hotel.png";
        $('.propty').
          append(
            '<figure class="type" title="Hotel"><img src="'+srcHot+'" alt=""></figure>' 
            );

      }else if(propType==="Cottage"){
        var srcCott="assets/img/property-types/cottage.png";
        $('.propty').
          append(
            '<figure class="type" title="Cottage"><img src="'+srcCott+'" alt=""></figure>' 
            );

      }else if(propType==="Flat"){
        var srcFlat="assets/img/property-types/condominium.png";
        $('.propty').
          append(
            '<figure class="type" title="Flat"><img src="'+srcFlat+'" alt=""></figure>' 
            );

      }else if(propType==="House"){
        var srcHou="assets/img/property-types/single-family.png";
        $('.propty').
          append(
            '<figure class="type" title="House"><img src="'+srcHou+'" alt=""></figure>' 
            );

      }else{
        var srcland="assets/img/property-types/land.png";
        $('.propty').
          append(
            '<figure class="type" title="Land"><img src="'+srcland+'" alt=""></figure>' 
            );

      }
      // if (bed="undefined") {
        
      //   document.getElementById('bedss').innerHTML = "N/A";

      // }
      // if (baths="undefined") {
      //   document.getElementById('bths').innerHTML = "N/A";
      // }
      // // if (garage="undefined") {
      // //   document.getElementById('grge').innerHTML = "N/A";
      // // }

    });
  });


  /// retrieving users......./

  //  TODO:  retrieving agents
  var useeref =firebase.database().ref('property owners/seller');
  useeref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      var Fname=childSnapshot.val().FirstName;
      var Lname=childSnapshot.val().LastName;
      var email=childSnapshot.val().email;
      var phone=childSnapshot.val().phone;
      var ProfilePic=childSnapshot.val().ProfilePic;
      var properties=childSnapshot.child("property").numChildren();

      
      var averagref = firebase.database().ref("Rates/" +key);
      averagref.limitToFirst(1).once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        var vl = childSnapshot.val().val;
        
        var averagerate = Math.round(vl * 10) / 10;
      
        
        // total number of stars
        const starTotal = 5;
        
        const starPercentage = (averagerate  / starTotal) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
        

        $('.agentie').
      append(
        '<div class="col-md-12 col-lg-6">' +
          '<div class="agent">' +
              '<a href="agent-detail.html?name='+key+'" class="agent-image"><img height ="180" alt="userimage" src="'+ProfilePic+'" onerror=this.src="assets/img/agent-01.jpg"></a>' +
              '<div class="wrapper">' +
                  '<header><a href="agent-detail.html?name='+key+'" ><h2>'+Fname+' '+Lname+'</h2></a></header>' +
                  '<aside>'+properties+ ' Properties</aside>' +
                  '<dl>' +
                      '<dt>Phone:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Mobile:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Email:</dt>' +
                      '<dd><a href="mailto:'+email+'">'+email+'</a></dd>' +
                      '<!--<dt>Skype:</dt>-->' +
                      '<!--<dd>john.doe</dd>-->' +
                  '</dl>' +
              '</div>' +
              '<div class="stars-outer" style="font-size: 20px; ">'+
                  '<div class="stars-inner" id="inner"  style="width:'+starPercentageRounded+' ;"></div>'+
							'</div>'+
          '</div><!-- /.agent -->' +
        '</div><!-- /.col-md-12 -->'
      );
        
      });
    });
  
    });
  });
  //  TODO:  retrieving professionals

  //surveyor
  var surveref =firebase.database().ref('professional/surveyor');
  surveref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      var Fname=childSnapshot.val().FirstName;
      var Lname=childSnapshot.val().LastName;
      var email=childSnapshot.val().email;
      var phone=childSnapshot.val().phone;
      var ProfilePic=childSnapshot.val().ProfilePic;
      var company=childSnapshot.val().company;

      var averagref = firebase.database().ref("Rates/" +key);
      averagref.limitToFirst(1).once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        var vl = childSnapshot.val().val;
        
        var averagerate = Math.round(vl * 10) / 10;
      
        
        // total number of stars
        const starTotal = 5;
        
        const starPercentage = (averagerate  / starTotal) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
      

       $('.surveyor').
      append(
        '<div class="col-md-12 col-lg-6">' +
          '<div class="agent">' +
              '<a href="agent-detail.html?name='+key+'" class="agent-image"><img height ="180" alt="userimage" src="'+ProfilePic+'" onerror=this.src="assets/img/agent-01.jpg"></a>' +
              '<div class="wrapper">' +
                  '<header><a href="agent-detail.html?name='+key+'" ><h2>'+Fname+' '+Lname+'</h2></a></header>' +
                  '<aside>Contact</aside>' +
                  '<dl>' +
                      '<dt>Company:</dt>' +
                      '<dd>'+company+'</dd>' +
                      '<dt>Phone:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Mobile:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Email:</dt>' +
                      '<dd><a href="mailto:'+email+'">'+email+'</a></dd>' +
                      '<!--<dt>Skype:</dt>-->' +
                      '<!--<dd>john.doe</dd>-->' +
                  '</dl>' +
              '</div>' +
              '<div class="stars-outer" style="font-size: 20px;">'+
              '<div class="stars-inner" id="inner"  style="width:'+starPercentageRounded+' ;"></div>'+
							'</div>'+
          '</div><!-- /.agent -->' +
        '</div><!-- /.col-md-12 -->'
      );
    });
  });  


    });
  });

  //architect
  var archetref =firebase.database().ref('professional/architect');
  archetref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      var Fname=childSnapshot.val().FirstName;
      var Lname=childSnapshot.val().LastName;
      var email=childSnapshot.val().email;
      var phone=childSnapshot.val().phone;
      var ProfilePic=childSnapshot.val().ProfilePic;
      var company=childSnapshot.val().company;

      var averagref = firebase.database().ref("Rates/" +key);
      averagref.limitToFirst(1).once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        var vl = childSnapshot.val().val;
        
        var averagerate = Math.round(vl * 10) / 10;
      
        
        // total number of stars
        const starTotal = 5;
        
        const starPercentage = (averagerate  / starTotal) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
      

       $('.architect').
      append(
        '<div class="col-md-12 col-lg-6">' +
          '<div class="agent">' +
              '<a href="agent-detail.html?name='+key+'" class="agent-image"><img height ="180" alt="userimage" src="'+ProfilePic+'" onerror=this.src="assets/img/agent-01.jpg"></a>' +
              '<div class="wrapper">' +
                  '<header><a href="agent-detail.html?name='+key+'" ><h2>'+Fname+' '+Lname+'</h2></a></header>' +
                  '<aside>Contact</aside>' +
                  '<dl>' +
                      '<dt>Company:</dt>' +
                      '<dd>'+company+'</dd>' +
                      '<dt>Phone:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Mobile:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Email:</dt>' +
                      '<dd><a href="mailto:'+email+'">'+email+'</a></dd>' +
                      '<!--<dt>Skype:</dt>-->' +
                      '<!--<dd>john.doe</dd>-->' +
                  '</dl>' +
              '</div>' +
              '<div class="stars-outer" style="font-size: 20px;">'+
              '<div class="stars-inner" id="inner"  style="width:'+starPercentageRounded+' ;"></div>'+
          '</div>'+
          '</div><!-- /.agent -->' +
        '</div><!-- /.col-md-12 -->'
      );
      });
    });
      
    });
  });

  //hardware
  var hardwareref =firebase.database().ref('professional/hardware');
  hardwareref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      var Fname=childSnapshot.val().FirstName;
      var Lname=childSnapshot.val().LastName;
      var email=childSnapshot.val().email;
      var phone=childSnapshot.val().phone;
      var ProfilePic=childSnapshot.val().ProfilePic;
      var company=childSnapshot.val().company;

      var averagref = firebase.database().ref("Rates/" +key);
      averagref.limitToFirst(1).once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        var vl = childSnapshot.val().val;
        
        var averagerate = Math.round(vl * 10) / 10;
      
        
        // total number of stars
        const starTotal = 5;
        
        const starPercentage = (averagerate  / starTotal) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;

       $('.hardware').
      append(
        '<div class="col-md-12 col-lg-6">' +
          '<div class="agent">' +
              '<a href="agent-detail.html?name='+key+'" class="agent-image"><img height ="180" alt="userimage" src="'+ProfilePic+'" onerror=this.src="assets/img/agent-01.jpg"></a>' +
              '<div class="wrapper">' +
                  '<header><a href="agent-detail.html?name='+key+'" ><h2>'+Fname+' '+Lname+'</h2></a></header>' +
                  '<aside>Contact</aside>' +
                  '<dl>' +
                      '<dt>Company:</dt>' +
                      '<dd>'+company+'</dd>' +
                      '<dt>Phone:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Mobile:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Email:</dt>' +
                      '<dd><a href="mailto:'+email+'">'+email+'</a></dd>' +
                      '<!--<dt>Skype:</dt>-->' +
                      '<!--<dd>john.doe</dd>-->' +
                  '</dl>' +
              '</div>' +
              '<div class="stars-outer" style="font-size: 20px;">'+
              '<div class="stars-inner" id="inner"  style="width:'+starPercentageRounded+' ;"></div>'+
							'</div>'+
          '</div><!-- /.agent -->' +
        '</div><!-- /.col-md-12 -->'
      );
      });
    });   


    });
  });

  //civilengineers
  var civilref =firebase.database().ref('professional/civilEngineer');
  civilref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      var Fname=childSnapshot.val().FirstName;
      var Lname=childSnapshot.val().LastName;
      var email=childSnapshot.val().email;
      var phone=childSnapshot.val().phone;
      var ProfilePic=childSnapshot.val().ProfilePic;
      var company=childSnapshot.val().company;

      var averagref = firebase.database().ref("Rates/" +key);
      averagref.limitToFirst(1).once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        var vl = childSnapshot.val().val;
        
        var averagerate = Math.round(vl * 10) / 10;
      
        
        // total number of stars
        const starTotal = 5;
        
        const starPercentage = (averagerate  / starTotal) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;

       $('.civils').
      append(
        '<div class="col-md-12 col-lg-6">' +
          '<div class="agent">' +
              '<a href="agent-detail.html?name='+key+'" class="agent-image"><img height ="180"alt="userimage" src="'+ProfilePic+'" onerror=this.src="assets/img/agent-01.jpg"></a>' +
              '<div class="wrapper">' +
                  '<header><a href="agent-detail.html?name='+key+'" ><h2>'+Fname+' '+Lname+'</h2></a></header>' +
                  '<aside>Contact</aside>' +
                  '<dl>' +
                      '<dt>Company:</dt>' +
                      '<dd>'+company+'</dd>' +
                      '<dt>Phone:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Mobile:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Email:</dt>' +
                      '<dd><a href="mailto:'+email+'">'+email+'</a></dd>' +
                      '<!--<dt>Skype:</dt>-->' +
                      '<!--<dd>john.doe</dd>-->' +
                  '</dl>' +
              '</div>' +
              '<div class="stars-outer" style="font-size: 20px;">'+
              '<div class="stars-inner" id="inner"  style="width:'+starPercentageRounded+' ;"></div>'+
							'</div>'+
          '</div><!-- /.agent -->' +
        '</div><!-- /.col-md-12 -->'
      );
      
      });
    });
    });
  });

  //lawyer
  var lawyerref =firebase.database().ref('professional/Lawyer');
  lawyerref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      var Fname=childSnapshot.val().FirstName;
      var Lname=childSnapshot.val().LastName;
      var email=childSnapshot.val().email;
      var phone=childSnapshot.val().phone;
      var ProfilePic=childSnapshot.val().ProfilePic;
      var company=childSnapshot.val().company;
      var averagref = firebase.database().ref("Rates/" +key);
      averagref.limitToFirst(1).once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        var vl = childSnapshot.val().val;
        
        var averagerate = Math.round(vl * 10) / 10;
      
        
        // total number of stars
        const starTotal = 5;
        
        const starPercentage = (averagerate  / starTotal) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;

       $('.lawyer').
      append(
        '<div class="col-md-12 col-lg-6">' +
          '<div class="agent">' +
              '<a href="agent-detail.html?name='+key+'" class="agent-image"><img height ="180" alt="userimage" src="'+ProfilePic+'" onerror=this.src="assets/img/agent-01.jpg"></a>' +
              '<div class="wrapper">' +
                  '<header><a href="agent-detail.html?name='+key+'" ><h2>'+Fname+' '+Lname+'</h2></a></header>' +
                  '<aside>Contact</aside>' +
                  '<dl>' +
                      '<dt>Company:</dt>' +
                      '<dd>'+company+'</dd>' +
                      '<dt>Phone:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Mobile:</dt>' +
                      '<dd>(+256)'+phone+'</dd>' +
                      '<dt>Email:</dt>' +
                      '<dd><a href="mailto:'+email+'">'+email+'</a></dd>' +
                      '<!--<dt>Skype:</dt>-->' +
                      '<!--<dd>john.doe</dd>-->' +
                  '</dl>' +
              '</div>' +
              '<div class="stars-outer" style="font-size: 20px;">'+
              '<div class="stars-inner" id="inner"  style="width:'+starPercentageRounded+' ;"></div>'+
							'</div>'+ 
          '</div><!-- /.agent -->' +
        '</div><!-- /.col-md-12 -->'
      );
      });
    });
     
    });
  });

   //  TODO:  retrieving agency
  var useeref11 =firebase.database().ref('property owners/Agency');
  useeref11.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      var Name=childSnapshot.val().AgencyName;
      var website=childSnapshot.val().website;
      var email=childSnapshot.val().email;
      var phone=childSnapshot.val().phone;
      var address=childSnapshot.val().address;
      var city =childSnapshot.val().city;
      var description=childSnapshot.val().Description;
      var license=childSnapshot.val().license;
      var postal=childSnapshot.val().postal;
      var ProfilePic=childSnapshot.val().ProfilePic;
      var properties=childSnapshot.child("property").numChildren();
      var averagref = firebase.database().ref("Rates/" +key);
      averagref.limitToFirst(1).once("value").then(function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        var vl = childSnapshot.val().val;
        
        var averagerate = Math.round(vl * 10) / 10;
      
        
        // total number of stars
        const starTotal = 5;
        
        const starPercentage = (averagerate  / starTotal) * 100;
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
      

      $('.agencie').
        append(
          '<div class="agency">'+
          //adding agency logo
            '<a href="agency-detail.html?name='+key+'" class="agency-image"><img alt="" src="'+ProfilePic+'" onerror=this.src="assets/img/agency-logo-01.png"></a>'+
            '<div class="wrapper">'+
                '<header><a href="agency-detail.html?name='+key+'"><h2>'+Name+'</h2></a></header>'+
                '<dl>'+
                    '<dt>Phone:</dt>'+
                    '<dd>(+256)'+phone+'</dd>'+
                    '<dt>Mobile:</dt>'+
                    '<dd>(+256)'+phone+'</dd>'+
                    '<dt>Email:</dt>'+
                    '<dd><a href="mailto:'+email+'">'+email+'</a></dd>'+
                    '<dt>Website:</dt>'+
                    '<dd><a href="#">'+website+'</a></dd>'+
                '</dl>'+
                '<address>'+
                    '<strong>Address</strong>'+
                    '<br>'+
                    '<strong>'+Name+'</strong><br>'+
                    ''+address+'<br>'+
                    ''+postal+'<br>'+
                    '<div class="stars-outer" style="font-size: 20px;">'+
                    '<div class="stars-inner" id="inner"  style="width:'+starPercentageRounded+' ;"></div>'+
                '</address>'+
            '</div>'+
          '</div><!-- /.agency -->'
          );
        });
      });

      




    });
  });

  

  ///add all properties
  //  TODO: retriev all properties
  var propref =firebase.database().ref('AllProperty');
  propref.once("value").then(function(snapshot) {
    $('#allprop').html('');
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      

      var Title=childSnapshot.val().Title;
      // alert(Title);
      var Address=childSnapshot.val().Address;
      var Area=childSnapshot.val().Area;
      var description=childSnapshot.val().Description;
      var price=childSnapshot.val().Price;
      var Land_Type=childSnapshot.val().Land_Type;
      var Photos=childSnapshot.val().Photos;
      var Status=childSnapshot.val().Status;
      var bed=childSnapshot.val().Beds||"N/A";
      var baths=childSnapshot.val().Bathrooms||"N/A";
      var garage=childSnapshot.val().Garages||"N/A";

      $('#allprop').
      append(
        '<div class="col-md-3 col-sm-6" style="padding-top: 20px;">' +
          '<div class="property">' +
              '<a href="property-detail.html?name='+key+'" >' +
                  '<div class="property-image">' +
                      '<img alt="property" src="'+Photos+'" style="width: 514px; height:386px">' +
                  '</div>' +
                  '<div class="overlay">' +
                      '<div class="info">'  +
                          '<div class="tag price">UGX '+price+'</div>' +
                          '<h3>'+Title+'</h3>' +
                          '<figure>'+Address+'</figure>' +
                      '</div>' +
                      '<ul class="additional-info">' +
                          '<li>'+
                              '<header>Area:</header>' +
                              '<figure><span >'+Area+ '</span>m<sup>2</sup></figure>' +
                          '</li>' +
                          '<li>' +
                              '<header>Beds:</header>' +
                              '<figure id="bedss">'+bed+'</figure>' +
                          '</li>' +
                          '<li>' +
                              '<header>Baths:</header>' +
                              '<figure id="bths">'+baths+'</figure>' +
                          '</li>' +
                          '<li>' +
                              '<header>Garages:</header>' +
                              '<figure id="grge">'+garage+'</figure>' +
                          '</li>' +
                      '</ul>' +
                  '</div>'+
              '</a>' +
            '</div><!-- /.property -->' +
        '</div><!-- /.col-md-3 -->'

        );
      // if (bed="undefined") {
        
      //   document.getElementById('bedss').innerHTML = "N/A";

      // }
      // if (baths="undefined") {
      //   document.getElementById('bths').innerHTML = "N/A";
      // }
      // if (garage="undefined") {
      //   document.getElementById('grge').innerHTML = "N/A";
      // }


    });
  });
  //rating  here
  

});
