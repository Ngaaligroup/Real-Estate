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
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("users/" +uid);
    ref.once("value").then(function(snapshot) {
        var val = snapshot.val();
        var Fname=val.FirstName;
        var Lname=val.LastName;
        var Name=val.AgencyName;
        var email=val.email;
        var phone=val.phone;
        var ProfilePic=val.ProfilePic;

        $('.img-c').
        append(
            '<div class="image-upload">'+                               
                '<label for="file-input">'+
                    '<img src="'+ProfilePic+'"/>'+
                '</label>'+

                '<!-- <input id="file-input" type="file" /> -->'+
                '<input id="file-input" class="image" type="file" name="imgbtn" src="'+ProfilePic+'" alt="Tool Tip" accept="image/jpeg,image/png">'+
            '</div>');
        // document.getElementById('form-account-lname').value = Lname;
        document.getElementById('form-account-email').value = email;
        document.getElementById('form-account-phone').value = phone;
        if(Name===null){
          document.getElementById('form-account-name').value = Fname + Lname;
        }else{
          document.getElementById('form-account-name').value = Name;
        }
        
        
      
    });

    $('#account-submitChanges').on('submit', function( event ) { 
        event.preventDefault();

        var user = firebase.auth().currentUser;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var file = $("#file-input")[0].files[0];
        var uid = firebase.auth().currentUser.uid;
        
        var today = new Date().toLocaleDateString();
        var time =firebase.database.ServerValue.TIMESTAMP;

        var Fname= $('#form-account-fname').val();
        var Lname= $('#form-account-lname').val();
        var email= $('#form-account-email').val();
        var phone= $('#form-account-phone').val();
        var facebook= $('#account-social-facebook').val();
        var twiiter= $('#account-social-twitter').val();
        if ($("#file-input").get(0).files.length != 0) {
            var storage1 = firebase.storage();
            var storageRef1 = storage1.ref();
            var file1 = $("#file-input")[0].files[0];
            var imgRef3 = storageRef1.child(uid + "/ProfilePic/" + file1.name);
            var upload = imgRef3.put(file1).then(function(snapshot){
              snapshot.ref.getDownloadURL().then(function(url) {
                var dbt  = firebase.database().ref();
                dbt.child("users/" + uid).update({ProfilePic: url});
              });
            });
        }else{}

        var db = firebase.database().ref();
        // db.child("users/" + uid).update({FirstName: Fname});
        // db.child("users/" + uid).update({LastName: Lname});
        db.child("users/" + uid).update({email: email});
        db.child("users/" + uid).update({phone: phone});
        db.child("users/" + uid).update({Facebook: facebook});
        db.child("users/" + uid).update({Twitter: twiiter});
        
    });
});