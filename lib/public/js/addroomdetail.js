
    
    function addRoomDetail() {
 
    let State = $('#State').val();
    let City = $('#City').val();
    let Ownername = $('#Ownername').val();
    let Roomtype = $('#Roomtype').val();
    let contactno = $('#contactno').val();
    let maxpeople = $('#maxpeople').val();
    let facility = $('#facility').val();
    facility =JSON.stringify(facility);
    let facilitytext = $('#facility').text();
    facilitytext =JSON.stringify(facilitytext);
    let Roomfor = $('#Roomfor').val();
    Roomfor =JSON.stringify(Roomfor);
    let Roomfortext = $('#Roomfor').text();
    Roomfortext =JSON.stringify(Roomfortext);
    let myFilesecondary = [] ;
    myFilesecondary.push($('#myFilesecondary').val());
    myFilesecondary =JSON.stringify(myFilesecondary);
    let myFile = $('#myFile').val();
    let landmark=$('#landmark').val();
    let address=$('#address').val();
    let extrainfo =[];

    extrainfo =JSON.stringify(extrainfo);
    
    let specialfeature = [];
  
    specialfeature =JSON.stringify(specialfeature);

    let roomdetail = $('#roomdetail').val();
    
    let bookedornot='0' ;
    let latitude = $('#lati_typeadmin').val();
    let longitude=$('#log_typeadmin').val();
    let locationname=$('#Locationame').val();
    let ownerfirstname= $('#ownerfirstname').val();
    let ownerlastname= $('#ownerlastname').val();
    let owneremailid= $('#owneremailid').val();
    let owneradress= $('#owneradress').val();
    let roomrent= $('#ownerrent').val();
    let furnished= $('#furnished').val();
    let propertyarea= $('#propertyarea').val();
    let electbill= $('#electbill').val();
    let waterbill= $('#waterbill').val();
    let maintcharge= $('#maintcharge').val();
    let secdepo= $('#secdepo').val();
    let mtccharge= $('#mtccharge').val();
    let mtcrent= $('#mtcrent').val();
    let finalrent= $('#finalrent').val();
    let addcharges= $('#addcharges').val();
    let addcomment= $('#addcomment').val();
   
    let log_typeadmin=$('#log_typeadmin').val();
    
    let Locationame1=$('#Locationame').val();
    

    
  
    $.ajax({
        url: "/addRoomDetaildata",
        method: "POST",
        data: JSON.stringify({
          'State': State, 'City': City,'Ownername':Ownername ,'Roomtype':Roomtype , 'contactno' :contactno ,
          'maxpeople':maxpeople , 'facility':facility , 'Roomfor':Roomfor , 'myFilesecondary':myFilesecondary ,
          'myFile':myFile , 'landmark':landmark , 'address':address , 
          'roomdetail':roomdetail , 'roomrent':roomrent , 'bookedornot':bookedornot,'latitude':latitude,'longitude':longitude,
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
        }),
        success: function (response) {
          console.log(response);
            
          location.href = "/roomlist";
        }
});
    }


    function addRoomDetail1() {
      
  
      var form = $('#imagefileupload')[0];
      // Create an FormData object
      console.log(form);
      var body = new FormData(form);
     
  console.log(body);
      $.ajax({
          type: "POST",
          enctype: 'multipart/form-data',
          url: "/uploadimage",
          data: body,
          processData: false,
          contentType: false,
          cache: false,
          timeout: 60000000,
          success: function (data) {
            
          }
                        })
                      }


                    
                    
                      function addRoomDetail2() {
                    
                    
                      
                      var form = $('#imagefileuploadsec')[0];
                      var body = new FormData(form);
                      //myFilesecondary
                      var totalfiles =document.getElementById('myFilesecondary').files.length
                      for (var x=0; x<totalfiles;x++){
                        body.append("files[]",document.getElementById('myFilesecondary').files[x]);
                       
                        console.log('append a file');
                      }
        //               if ($('#myFilesecondary').val()){
        // var filelist =$('#myFilesecondary').get(0).files;
        // for (var x=0; x<filelist.length;x++){
        //   body.append('file'+x ,filelist.item(x));
        //   console.log('append a file');
        // }
        //               }
                        // Create an FormData object
      console.log(form);
     
  console.log(body);
      $.ajax({
          type: "POST",
          enctype: 'multipart/form-data',
          url: "/uploadimage",
          data: body,
          processData: false,
          contentType: false,
          cache: false,
          timeout: 60000000,
          success: function (data) {
            console.log("data" + data )
          }
                        })
                      }
                    