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

    $('#sign-out').on('click', function(e) {
      e.preventDefault();
      firebase.auth().signOut();
      window.location.href = "sign-in.html";
    });
  
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
  
  
    function getUrlParam(param)
                {
                  param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
                  var regex = new RegExp("[?&]" + param + "=([^&#]*)");
                  var url   = decodeURIComponent(window.location.href);
                  var match = regex.exec(url);
                  return match ? match[1] : "";
    
                  
                }
            var param = getUrlParam("name");
            var ref = firebase.database().ref("AllProperty/" +param);
            ref.once("value").then(function(snapshot) {
              var val = snapshot.val();
              var Title=val.Title;
                 
              var Address=val.Address;
              var Area=val.Area;
              var description=val.Description;
              var price=val.Price;
              var Land_Type=val.Land_Type;
              var Photos=val.Photos;
              var Status=val.Status;
              var bed=val.Beds;
              var baths=val.Bathrooms;
              var garage=val.Garages;
              var propType= val.PropertyType;
              var owners=val.Owner;
              var state=val.State;

              document.getElementById('submit-titleupdate').value = Title;
              
              document.getElementById('submit-priceupdate').value = price;
              document.getElementById('submit-statusupdate').value = Status;
              document.getElementById('submit-areaupdate').value = Area;
              document.getElementById('submit-Bedsupdate').value = bed;
              document.getElementById('submit-Bathsupdate').value = baths;
              document.getElementById('submit-garagesupdate').value = garage;
              document.getElementById('submit-descriptionupdate').value = description;
              document.getElementById('submit-property-typeupdate').value = propType;
              document.getElementById('submit-land-typeupdate').value =  Land_Type;
              document.getElementById('submit-stateupdate').value = state;
              console.log(Title);


            });
    $('#updatebutton').on('submit', function( event ) { 
      event.preventDefault();
      
  
      var user = firebase.auth().currentUser;
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var file = $("#file-upload")[0].files[0];
    
      var today = new Date().toLocaleDateString();
      var time =firebase.database.ServerValue.TIMESTAMP;
  
  
      
      
        
      // var propertyhouse={
      //   Title: $('#submit-titleupdate').val(),
      //   Price: $('submit-priceupdate').val(),
      //   Description: $('#submit-descriptionupdate').val(),
      //   PropertyType: $('#submit-property-typeupdate').val(),
      //   Status: $('#submit-statusupdate').val(),
      //   State: $('#submit-stateupdate').val(),
      //   Beds: $('#submit-Bedsupdate').val(),
      //   Bathrooms: $('#submit-Bathsupdate').val(),
      //   Area: $('#submit-areaupdate').val(),
      //   Garages: $('#submit-garagesupdate').val(),
      //   Address: $('#address-map').val(),
      //   Latitude: $('#latitude').val(),
      //   Longitude: $('#longitude').val(),
      //   Land_Type: $("#submit-land-typeupdate").val(),
      //   Photos: ""
        
        
      // };
      // var propertyland={
      //   Title: $('#submit-titleupdate').val(),
      //   Price: $('submit-priceupdate').val(),
      //   Description: $('#submit-descriptionupdate').val(),
      //   Status: $("#submit-statusupdate").val(),
      //   Area: $('#submit-areaupdate').val(),
      //   Land_Type: $("#submit-land-typeupdate").val(),
      //   Address: $('#address-map').val(),
      //   Latitude: $('#latitude').val(),
      //   Longitude: $('#longitude').val(),
      //   Photos: ""
        
        
      //   };
        var Title= $('#submit-titleupdate').val();
        var Price= $('submit-priceupdate').val();
        var Description= $('#submit-descriptionupdate').val();
        var PropertyType= $('#submit-property-typeupdate').val();
        var Status= $('#submit-statusupdate').val();
        var State= $('#submit-stateupdate').val();
        var Beds= $('#submit-Bedsupdate').val();
        var Bathrooms= $('#submit-Bathsupdate').val();
        var Area= $('#submit-areaupdate').val();
        var Garages= $('#submit-garagesupdate').val();
        var Address= $('#address-map').val();
        var Latitude= $('#latitude').val();
        var Longitude= $('#longitude').val();
        var Land_Type= $("#submit-land-typeupdate").val();
        var Photos= "";
  
        
          if ($('#submit-property-typeupdate').val() =="Land") {
            // TODO: submit land properties
            var db = firebase.database().ref();
            var userdb= firebase.database().ref();
            db.child('properties/Land/' + param).update({Title: Title});
            db.child('properties/Land/' + param).update({Price: Price});
            db.child('properties/Land/' + param).update({Description: Description});
            db.child('properties/Land/' + param).update({Status: Status});
            db.child('properties/Land/' + param).update({Area: Area});
            db.child('properties/Land/' + param).update({Land_Type: Land_Type});
            db.child('properties/Land/' + param).update({Address: Address});
            db.child('properties/Land/' + param).update({Latitude: Latitude});
            db.child('properties/Land/' + param).update({Longitude: Longitude});
            

            db.child('users/' + user.uid + "/property/" + param).update({Title: Title});
            db.child('users/' + user.uid + "/property/" + param).update({Price: Price});
            db.child('users/' + user.uid + "/property/" + param).update({Description: Description});
            db.child('users/' + user.uid + "/property/" + param).update({Status: Status});
            db.child('users/' + user.uid + "/property/" + param).update({Area: Area});
            db.child('users/' + user.uid + "/property/" + param).update({Land_Type: Land_Type});
            db.child('users/' + user.uid + "/property/" + param).update({Address: Address});
            db.child('users/' + user.uid + "/property/" + param).update({Latitude: Latitude});
            db.child('users/' + user.uid + "/property/" + param).update({Longitude: Longitude});
            
            db.child('AllProperty/' + param).update({Title: Title});
            db.child('AllProperty/' + param).update({Price: Price});
            db.child('AllProperty/' + param).update({Description: Description});
            db.child('AllProperty/' + param).update({Status: Status});
            db.child('AllProperty/' + param).update({Area: Area});
            db.child('AllProperty/' + param).update({Land_Type: Land_Type});
            db.child('AllProperty/' + param).update({Address: Address});
            db.child('AllProperty/' + param).update({Latitude: Latitude});
            db.child('AllProperty/' + param).update({Longitude: Longitude});
  
  
          }else{
  
            // TODO: submit other properties
            var db1 = firebase.database().ref();
            db1.child('properties/house/' + param).update({Title: Title});
            db1.child('properties/house/' + param).update({Price: Price});
            db1.child('properties/house/' + param).update({Description: Description});
            db1.child('properties/house/' + param).update({PropertyType: PropertyType});
            db1.child('properties/house/' + param).update({State: State});
            db1.child('properties/house/' + param).update({Beds: Beds});
            db1.child('properties/house/' + param).update({Bathrooms: Bathrooms});
            db1.child('properties/house/' + param).update({Garages: Garages});
            db1.child('properties/house/' + param).update({Status: Status});
            db1.child('properties/house/' + param).update({Area: Area});
            db1.child('properties/house/' + param).update({Land_Type: Land_Type});
            db1.child('properties/house/' + param).update({Address: Address});
            db1.child('properties/house/' + param).update({Latitude: Latitude});
            db1.child('properties/house/' + param).update({Longitude: Longitude});

            db1.child('users/' + user.uid + "/property/" + param).update({Title: Title});
            db1.child('users/' + user.uid + "/property/" + param).update({Price: Price});
            db1.child('users/' + user.uid + "/property/" + param).update({Description: Description});
            db1.child('users/' + user.uid + "/property/" + param).update({PropertyType: PropertyType});
            db1.child('users/' + user.uid + "/property/" + param).update({State: State});
            db1.child('users/' + user.uid + "/property/" + param).update({Beds: Beds});
            db1.child('users/' + user.uid + "/property/" + param).update({Bathrooms: Bathrooms});
            db1.child('users/' + user.uid + "/property/" + param).update({Garages: Garages});
            db1.child('users/' + user.uid + "/property/" + param).update({Status: Status});
            db1.child('users/' + user.uid + "/property/" + param).update({Area: Area});
            db1.child('users/' + user.uid + "/property/" + param).update({Land_Type: Land_Type});
            db1.child('users/' + user.uid + "/property/" + param).update({Address: Address});
            db1.child('users/' + user.uid + "/property/" + param).update({Latitude: Latitude});
            db1.child('users/' + user.uid + "/property/" + param).update({Longitude: Longitude});

            db1.child('AllProperty/' + param).update({Title: Title});
            db1.child('AllProperty/' + param).update({Price: Price});
            db1.child('AllProperty/' + param).update({Description: Description});
            db1.child('AllProperty/' + param).update({Status: Status});
            db1.child('AllProperty/' + param).update({Area: Area});
            db1.child('AllProperty/' + param).update({Land_Type: Land_Type});
            db1.child('AllProperty/' + param).update({Address: Address});
            db1.child('AllProperty/' + param).update({Latitude: Latitude});
            db1.child('AllProperty/' + param).update({Longitude: Longitude});
            db1.child('AllProperty/' + param).update({PropertyType: PropertyType});
            db1.child('AllProperty/' + param).update({State: State});
            db1.child('AllProperty/' + param).update({Beds: Beds});
            db1.child('AllProperty/' + param).update({Bathrooms: Bathrooms});
            db1.child('AllProperty/' + param).update({Garages: Garages});
          }
  
  
          if ($(".propertypic").get(0).files.length != 0) {
            var storage1 = firebase.storage();
            var storageRef1 = storage1.ref();
            var file1 = $(".propertypic")[0].files[0];
            var imgRef = storageRef1.child(user.uid + "/" + param+ "/properties/" + file.name);
            var upload = imgRef.put(file1).then(function(snapshot){
              snapshot.ref.getDownloadURL().then(function(url) {
                if ($('#submit-property-typeupdate').val() =="Land") {
                  // TODO: submit land pictures
                  var db = firebase.database().ref();
                  db.child('properties/Land/' +  param).update({Photos: url});
                  db.child('users/' + user.uid + "/property/" + param).update({Photos: url});
                  db.child('AllProperty/' + param).update({Photos: url});
                  console.log("Photos:" +url);
                }else{
                  var db2= firebase.database().ref();
                  db2.child('properties/house/' + param ).update({Photos: url});
                  db2.child('users/' + user.uid + "/property/" + param).update({Photos: url});
                  db2.child('AllProperty/' + param).update({Photos: url});
                  console.log("Photos:" +url);
                  
  
                }
                window.location.href = "my-properties.html";
                // document.getElementById("form-submit-property").reset();
              });
            });
  
          }else{
            
            window.alert("please add atleast one picture of your property");
          }
        
        
    });

          
});
