
    function signUPform() {
      alert("in");
    //$('#loading').modal('show');    
    let username = $('#email').val();
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let contactno = $('#contactno').val();
    let password = $('#password').val();
    let Repeatpsd = $('#Repeatpsd').val();
  
    $.ajax({
        url: "/signUPpage",
        method: "POST",
        data: {
          'username': username, 'password': password ,'firstname':firstname
          ,'lastname':lastname ,'contactno':contactno
        },
        success: function (response) {
          console.log(response);
          //var data = JSON.parse(response);

         // $('#loading').modal('hide');
          location.href = "/home";
        }
});
    }



    function LoginForm() {
      
      let username = $('#username').val();
      let password = $('#password').val();
    
      $.ajax({
          url: "/LoginInUser",
          method: "POST",
          data: {
            'username': username, 'password': password
          },
          success: function (response) {
            console.log(response);
            var data = JSON.parse(response);
  
            $('#loading').modal('hide');
            location.href = "/home";
          }
  });
      }


