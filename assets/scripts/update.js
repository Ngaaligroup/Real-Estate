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

          
            });
