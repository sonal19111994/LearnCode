
    $(document).ready(function () {
    $("#updateroomdetailbtn").on("click", function(){
        alert("entry")
       let id = $(this).data('id');
       alert(id);
       let State = $('#updState').val();
       let City = $('#updCity').val();
       let Ownername = $('#updOwnername').val();
       let Roomtype = $('#updRoomtype').val();
       let contactno = $('#updcontactno').val();
       let maxpeople = $('#updmaxpeople').val();
       let facility = $('#updfacility').val();
       facility =JSON.stringify(facility);
       let Roomfor = $('#updRoomfor').val();
       Roomfor =JSON.stringify(Roomfor);
       let myFilesecondary = [] ;
       myFilesecondary.push($('#updmyFilesecondary').val());
       myFilesecondary =JSON.stringify(myFilesecondary);
       let myFile = $('#updmyFile').val();
       let landmark=$('#updlandmark').val();
       let address=$('#updaddress').val();
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
   
       var roomdetail = $('#updroomdetail').val();
       var roomrent = '2000' ;
       var bookedornot='0' ;
   
       
     
       $.ajax({
           url: "/updateRoomDetaildata",
           method: "POST",
           data: {
            'id':id, 'State': State, 'City': City,'Ownername':Ownername ,'Roomtype':Roomtype , 'contactno' :contactno ,
             'maxpeople':maxpeople , 'facility':facility , 'Roomfor':Roomfor , 'myFilesecondary':myFilesecondary ,
             'myFile':myFile , 'landmark':landmark , 'address':address , 'extrainfo':extrainfo , 'specialfeature':specialfeature,
             'roomdetail':roomdetail , 'roomrent':roomrent , 'bookedornot':bookedornot
   
           },
           success: function (response) {
             console.log(response);
             alert("success");
             //var data = JSON.parse(response);   
             location.href = "/home";
           }
   });
       });
    });
   