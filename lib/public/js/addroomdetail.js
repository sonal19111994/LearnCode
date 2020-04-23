
    
    function addRoomDetail() {
     alert("entry")
    let State = $('#State').val();
    let City = $('#City').val();
    let Ownername = $('#Ownername').val();
    let Roomtype = $('#Roomtype').val();
    let contactno = $('#contactno').val();
    let maxpeople = $('#maxpeople').val();
    let facility = $('#facility').val();
    facility =JSON.stringify(facility);
    let Roomfor = $('#Roomfor').val();
    Roomfor =JSON.stringify(Roomfor);
    let myFilesecondary = [] ;
    myFilesecondary.push($('#myFilesecondary').val());
    myFilesecondary =JSON.stringify(myFilesecondary);
    let myFile = $('#myFile').val();
    let landmark=$('#landmark').val();
    let address=$('#address').val();
    let extrainfo =[];
     $('.extrainfo').each(function(index, item){
        var val = $(item).val();
        var id = $(item).attr('id');
        extrainfo.push(val);
    });
    extrainfo =JSON.stringify(extrainfo);
    
    let specialfeature = [];
    $('.specialfeature').each(function(index, item){
        var val = $(item).val();
        var id = $(item).attr('id');
        specialfeature.push(val);
    });
    specialfeature =JSON.stringify(specialfeature);

    var roomdetail = $('#roomdetail').val();
    var roomrent = '2000' ;
    var bookedornot='0' ;

    
  
    $.ajax({
        url: "/addRoomDetaildata",
        method: "POST",
        data: {
          'State': State, 'City': City,'Ownername':Ownername ,'Roomtype':Roomtype , 'contactno' :contactno ,
          'maxpeople':maxpeople , 'facility':facility , 'Roomfor':Roomfor , 'myFilesecondary':myFilesecondary ,
          'myFile':myFile , 'landmark':landmark , 'address':address , 'extrainfo':extrainfo , 'specialfeature':specialfeature,
          'roomdetail':roomdetail , 'roomrent':roomrent , 'bookedornot':bookedornot

        },
        success: function (response) {
          console.log(response);
          var data = JSON.parse(response);   
          location.href = "/home";
        }
});
    }
