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


            });
    $('#updatebutton').on('submit', function( event ) { 
      event.preventDefault();
      
  
      var user = firebase.auth().currentUser;
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var file = $("#file-upload")[0].files[0];
    
      var today = new Date().toLocaleDateString();
      var time =firebase.database.ServerValue.TIMESTAMP;
  
  
      
      
        
      var propertyhouse={
        Title: $('#submit-titleupdate').val(),
        Price: $('submit-priceupdate').val(),
        Description: $('#submit-descriptionupdate').val(),
        PropertyType: $('#submit-property-typeupdate').val(),
        Status: $('#submit-statusupdate').val(),
        State: $('#submit-stateupdate').val(),
        Beds: $('#submit-Bedsupdate').val(),
        Bathrooms: $('#submit-Bathsupdate').val(),
        Area: $('#submit-areaupdate').val(),
        Garages: $('#submit-garagesupdate').val(),
        Address: $('#address-map').val(),
        Latitude: $('#latitude').val(),
        Longitude: $('#longitude').val(),
        Land_Type: $("#submit-land-typeupdate").val(),
        Photos: ""
        
        
      };
      var propertyland={
        Title: $('#submit-titleupdate').val(),
        Price: $('submit-priceupdate').val(),
        Description: $('#submit-descriptionupdate').val(),
        Status: $("#submit-statusupdate").val(),
        Area: $('#submit-areaupdate').val(),
        Land_Type: $("#submit-land-typeupdate").val(),
        Address: $('#address-map').val(),
        Latitude: $('#latitude').val(),
        Longitude: $('#longitude').val(),
        Photos: ""
        
        
        };
  
        
          if ($('#submit-property-type').val() =="Land") {
            // TODO: submit land properties
            var db = firebase.database().ref();
            var userdb= firebase.database().ref();
            db.child('properties/Land/' + param).update(propertyland);
            db.child('users/' + user.uid + "/property/" + param).update(propertyland);
            db.child('AllProperty/' + param).update(propertyland);
  
  
          }else{
  
            // TODO: submit other properties
            var db1 = firebase.database().ref();
            db1.child('properties/house/' + param ).update(propertyhouse);
            db1.child('users/' + user.uid + "/property/" + param).update(propertyhouse);
            db1.child('AllProperty/' + param).update(propertyhouse);
          }
  
  
          if ($(".propertypic").get(0).files.length != 0) {
            var storage1 = firebase.storage();
            var storageRef1 = storage1.ref();
            var file1 = $(".propertypic")[0].files[0];
            var imgRef = storageRef1.child(user.uid + "/" + param+ "/properties/" + file.name);
            var upload = imgRef.put(file1).then(function(snapshot){
              snapshot.ref.getDownloadURL().then(function(url) {
                if ($('#submit-property-type').val() =="Land") {
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
