
    $(document).ready(function () {
    $("#updateroomdetailbtn").on("click", function(){
      
       let id = $(this).data('id');
     
       let State = $('#updState').val();
       let City = $('#updCity').val();
       let Ownername = $('#updOwnername').val();
       let Roomtype = $('#updRoomtype').val();
       let contactno = $('#updcontactno').val();
       let maxpeople = $('#updmaxpeople').val();
       let facility = $('#updfacility').val();
       facility =JSON.stringify(facility);
       let facilitytext = $('#facility').text();
       facilitytext =JSON.stringify(facilitytext);
       let Roomfor = $('#updRoomfor').val();
       Roomfor =JSON.stringify(Roomfor);
       let Roomfortext = $('#updRoomfor').text();
        Roomfortext =JSON.stringify(Roomfortext);
       let myFilesecondary = [] ;
       myFilesecondary.push($('#updmyFilesecondary').val());
       myFilesecondary =JSON.stringify(myFilesecondary);
       let myFile = $('#updmyFile').val();
       let landmark=$('#updlandmark').val();
       let address=$('#updaddress').val();
       let extrainfo =[];
        
       extrainfo =JSON.stringify(extrainfo);
       
       let specialfeature = [];
       
       specialfeature =JSON.stringify(specialfeature);
   
       var roomdetail = $('#updroomdetail').val();
      
       var bookedornot='0' ;
       
   
    let latitude = $('#updlati_typeadmin').val();
    let longitude=$('#updlog_typeadmin').val();
    let locationname=$('#updLocationame').val();
    let ownerfirstname= $('#updownerfirstname').val();
    let ownerlastname= $('#updownerlastname').val();
    let owneremailid= $('#updowneremailid').val();
    let owneradress= $('#updowneradress').val();
    let roomrent= $('#updownerrent').val();
    let furnished= $('#updfurnished').val();
    let propertyarea= $('#updpropertyarea').val();
    let electbill= $('#updelectbill').val();
    let waterbill= $('#updwaterbill').val();
    let maintcharge= $('#updmaintcharge').val();
    let secdepo= $('#updsecdepo').val();
    let mtccharge= $('#updmtccharge').val();
    let mtcrent= $('#updmtcrent').val();
    let finalrent= $('#updfinalrent').val();
    let addcharges= $('#updaddcharges').val();
    let addcomment= $('#updaddcomment').val();
   
       
     
       $.ajax({
           url: "/updateRoomDetaildata",
           method: "POST",
           data: {
            'id':id, 'State': State, 'City': City,'Ownername':Ownername ,'Roomtype':Roomtype , 'contactno' :contactno ,
             'maxpeople':maxpeople , 'facility':facility , 'Roomfor':Roomfor , 'myFilesecondary':myFilesecondary ,
             'myFile':myFile , 'landmark':landmark , 'address':address , 'extrainfo':extrainfo , 'specialfeature':specialfeature,
             'roomdetail':roomdetail , 'roomrent':roomrent , 'bookedornot':bookedornot 
             ,'latitude':latitude,'longitude':longitude,
          'locationname':locationname, 'ownerfirstname':ownerfirstname,'ownerlastname':ownerlastname,
          'owneremailid':owneremailid,
          'owneradress': owneradress,
          'ownerrent': ownerrent,
          'furnished':furnished,
          'propertyarea':propertyarea,
          'electbill':electbill,
          'waterbill':waterbill,
          'maintcharge':maintcharge,
          'secdepo':secdepo,
          'mtccharge':mtccharge,
          'mtcrent':mtcrent,
          'finalrent':finalrent,
          'addcharges':addcharges,
          'addcomment':addcomment,
          
          'Roomfortext':Roomfortext,
          'facilitytext':facilitytext
   
           },
           success: function (response) {
             console.log(response);
             
             //var data = JSON.parse(response);   
             location.href = "/home";
           }
   });
       });
    });
   