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

          document.getElementById('title').innerHTML = Title;
          document.getElementById('address').innerHTML = Address;
          document.getElementById('addresss').innerHTML = Address;
          document.getElementById('price').innerHTML = price;
          document.getElementById('status').innerHTML = Status;
          document.getElementById('area').innerHTML = Area;
          document.getElementById('bed').innerHTML = bed;
          document.getElementById('bath').innerHTML = baths;
          document.getElementById('garage').innerHTML = garage;
          document.getElementById('desc').innerHTML = description;
          document.getElementById('propty').innerHTML = propType;

          $('.slidein').
          append(
            '<div class="property-slide">'+
                '<a href="'+Photos+'" class="image-popup" >'+
                    '<div class="overlay"><h3>Front View</h3></div>'+
                    '<img alt="" src="'+Photos+'" >'+
                '</a>'+
            '</div>'+
            '<!--<div class="property-slide">'+
                '<a href="'+Photos+'" class="image-popup" >'+
                    '<div class="overlay"><h3>Bedroom</h3></div>'+
                    '<img alt="" src="'+Photos+'" >'+
                '</a>'+
            '</div>'+
            '<div class="property-slide">'+
                '<a href="'+Photos+'" class="image-popup" >'+
                    '<div class="overlay"><h3>Bathroom</h3></div>'+
                    '<img alt="" src="'+Photos+'" >'+
                '</a>'+
            '</div>-->'

            );
          var owersref=firebase.database().ref("users/" +owners);
          owersref.once("value").then(function(snapshot) {
            var childDatas=snapshot.val();
            var key = snapshot.key;
            console.log(childDatas);
            var Name=childDatas.AgencyName || childDatas.LastName;
            var email=childDatas.email;
            var phone=childDatas.phone;
            var aboutme=childDatas.AboutMe;
            var adres = childDatas.address;
            var city = childDatas.city;

            $('#agentee').append(
            '<figure><a href="agent-detail.html?name='+key+'"><img alt="" src="assets/img/agent-01.jpg"></a></figure>'+
              '<div class="agent-contact-info">'+
                  '<h3>'+Name+'</h3>'+
                  '<p>'+
                     
                  '</p>'+
                  '<dl>'+
                      '<dt>Phone:</dt>'+
                      '<dd>'+phone+'</dd>'+
                      '<dt>Mobile:</dt>'+
                      '<dd>'+phone+'</dd>'+
                      '<dt>Email:</dt>'+
                      '<dd><a href="mailto:'+email+'">'+email+'</a></dd>'+
                      '<!--<dt>Skype:</dt>-->'+
                      '<!--<dd>john.doe</dd>-->'+
                  '</dl>'+
                  '<hr>'+
                  '<a href="agent-detail.html?name='+key+'" class="link-arrow">Full Profile</a>'+
              '</div>');

          });
            // snapshot.forEach(function(childSnapshot) {
            //   var key = childSnapshot.key;
            //   var childData = childSnapshot.val();
            //   console.log(childData);
              

            //   
              

            
                    
                


            // })
        });
});