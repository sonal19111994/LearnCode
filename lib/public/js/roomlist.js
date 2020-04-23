$(document).ready(function () {

$('.roomlisttabledelete').click(function (e) {
        let id = $(this).attr('data-id');
        alert(id);
  
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

alert(id);
location.href = "/updateroomdetail?Room_ID=" + id + "";

});
})