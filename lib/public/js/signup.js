$(document).ready(function () {
    function signUp() {
    $('#loading').modal('show');    
    let username = $('#username').val();
    let password = $('#password').val();
  
    $.ajax({
        url: "/loginpage",
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
});