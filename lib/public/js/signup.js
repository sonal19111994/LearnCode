function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}


  $(document).ready(function() {

   
  });
    function signUPform() {
      if ($("#signupform .formValidate").valid()) {

   //// $('#loading').modal('show');    
    let username = $('#email').val();
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let contactno = $('#contactno').val();
    let password = $('#password').val();
    let Repeatpsd = $('#Repeatpsd').val();
    if(Repeatpsd ==  password) {

    
  
    $.ajax({
        url: "/signUPpage",
        method: "POST",
        data: {
          'username': username, 
          'password': password ,
          'firstname':firstname
          ,'lastname':lastname ,
          'contactno':contactno
        },
        success: function (response) {
          console.log(response);
          let origin=location.origin;
          let finalurl=origin + "/Confirmemail?mail="+ username;
          //let refrenceval= "http://localhost:3000/Confirmemail?mail=" + username
          let refrenceval=finalurl;
          $.ajax({
            url: "/signUPmail",
            method: "POST",
            data: {
              'username': username, 
              'password': password ,
              'firstname':firstname
              ,'lastname':lastname ,
              'contactno':contactno,
              'refrenceval':refrenceval
            },
            success: function (response) {
              console.log(response);
            console.log(response[0]);
            var data =response[0];
           console.log(data[0]);
            //$('#loading').modal('hide');
            //location.href = "/home";
            if(data[0] =='1')
            {
              var errormessage ='Email Id already Exist';
              $("#passworddivsignup").append("<span class='error'>"+errormessage+'</span>');
            }
            else{
              alert("Activation Link has been sent to your registered email ID");
              location.href='/home'
            }
              
            }
          });
        }
});
}

else{
  alert("Password Mismatch");
}
return false;
}
    }



    function LoginForm() {
      if ($("#signinform .formValidate").valid()) {
     // $('#loading').modal('show');
      
      let username = $('#usernamesignin').val();
      let password = $('#passwordsignin').val();
      var currenturl1 = getUrlVars()["currenturl"];
   
      $.ajax({
          url: "/LoginInUser",
          method: "POST",
          data: {
            'username': username, 'password': password
          },
          success: function (response) {
            console.log(response);
            console.log(response[0]);
            var data =response[0];
           console.log(data[0]);
            //$('#loading').modal('hide');
            //location.href = "/home";
            if(data[0] =='0')
            {
              var errormessage ='Inavlid Username or Password';
              $("#passworddiv").append("<span class='error'>"+errormessage+'</span>');
            }
            else if (data[0] =='2')
            {
              var errormessage ='A account activation link has been sent to your registered email Id';
              $("#passworddiv").append("<span class='error'>"+errormessage+'</span>');
            }
            else if (data[0] =='1'){
              console.log(username);
              //location.href = "/home";
              $.ajax({
                url: "/getUserDetail",
                method: "POST",
                data: {
                  'username': username
                },
                success: function (response) {
                  var currenturlnm = getUrlVars()["callback"];
                 
                  if ((currenturlnm === null) || (currenturlnm === undefined) || (currenturlnm === '')){
                    location.href = "/home";
                  }
                  else{
                    // var finalurl =window.location.href;
                    // myString = finalurl.replace('avoid','');
                    // location.href = currenturlnm;
                    location.href = "/home";
                  }
                  
                }
              });
            }
          }
  });
  return false;
  }
      }


