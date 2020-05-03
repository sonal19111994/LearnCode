$(document).ready(function () {

$('.roomlisttabledelete').click(function (e) {
        let id = $(this).attr('data-id');
      
  
    $.ajax({
        url: "/deleteRoomDetail",
        method: "POST",
        data: {
          'id':id
        },
        success: function (response) {
          console.log(response);
          //console.log(response);

          //console.log(response[0].id);
        

          location.href = "/roomlist";
        }
});
});

$('.roomlisttableedit').click(function (e) {

var id = $(this).data('id');

location.href = "/updateroomdetail?Room_ID=" + id + "";

});

$('.viewroomdetail').click(function (e) {

  var id = $(this).data('id');
  
  location.href = "/roomdetail?Room_ID=" + id + "";
  
  });


$('#bookavisit , #bookavisituser').click(function (e) {

  var roomid = $(this).data('id');
  let userid =$('#userid').val();
  let currenturl=window.location.href;
  if((userid == null)||(userid == undefined)||(userid == ''))
  {
    location.href="/signuppage?callback=" + currenturl + "";
  }

  else{

 
  let userid = $('#userid').val();
 
  let isbookvisit ='1'
  let isfav ='0'
  $.ajax({
    url: "/addfavorbookvisit",
    method: "POST",
    data: {
      'userid':userid,
      'isbookvisit':isbookvisit,
      'isfav':isfav,
      'roomid':roomid

      
    },
    success: function (response) {
      console.log(response);
    }
  })
  
}
  
  });

  
$('#addtofavlist').click(function (e) {

  var roomid = $(this).data('id');
  let userid =$('#userid').val();
 
  let currenturl=window.location.href;
  if((userid == null)||(userid == undefined)||(userid == ''))
  {
    location.href="/signuppage?callback=" + currenturl + "";
  }

  else{

 
  let userid = $('#userid').val();
  
  let isbookvisit ='0'
  let isfav ='1'
  $.ajax({
    url: "/addfavorbookvisit",
    method: "POST",
    data: {
      'userid':userid,
      'isbookvisit':isbookvisit,
      'isfav':isfav,
      'roomid':roomid

      
    },
    success: function (response) {
      console.log(response);
            console.log(response[0]);
            var data =response[0];
           console.log(data[0]);
           if(data[0] =='0')
            {
              $("#addtofavlist").html("Remove from fav"); 
            }
            if(data[0] =='1')
            {
              $("#addtofavlist").html("Remove from fav"); 
            }
    }
  })
  
}
})

$('#Removefromfavlist').click(function (e) {

  var roomid = $(this).data('id');
  let userid =$('#userid').val();
  
  if((userid == null)||(userid == undefined)||(userid == ''))
  {
    $('#loginlist').click();
  }

  else{

 
  let userid = $('#userid').val();
 
  let isbookvisit ='0'
  let isfav ='0'
  $.ajax({
    url: "/addfavorbookvisit",
    method: "POST",
    data: {
      'userid':userid,
      'isbookvisit':isbookvisit,
      'isfav':isfav,
      'roomid':roomid

      
    },
    success: function (response) {
      console.log(response);
    }
  })
  
}
})


})






function SearchRoom() {
  
 var location= $('#search_input').val();
 
 var latitude= $('#lati_type').val();
 var longitude= $('#log_type').val();
 if (location === ''){
  location ='Noida sector 12';
 }
 if(latitude === ''){
  longitude ='77.342346';
  latitude ='28.594490';
 }
 
 
window.location.href =  "/roomSearchDetail?location=" + location + "&lat="+latitude+"&lng="+longitude + "";
}
