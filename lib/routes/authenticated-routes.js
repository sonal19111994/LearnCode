/* eslint-disable linebreak-style */

// Importing the server side modules.
var express = require('express');
var nodemailer = require('nodemailer');
const cryptoJs = require('crypto-js');
const session = require('express-session');
var multer  = require('multer');
const jsSHA = require("jssha");
const request =require("request");
const router = express.Router();
var signup = require('../web/signup');
var addRoomDetail = require('../web/addRoomDetail');
var updateroomdetail = require('../web/updateroomdetail');
var aws = require('aws-sdk');
var formidable = require('formidable');
var path = require('path');
var roomlist = require('../web/roomlist');

const fs = require('fs');

router.post('/payment_gateway/payumoney', (req, res) => {
  req.body.txnid = '123456789'//Here pass txnid and it should be different 
   //on every call
 // req.body.email = req.user.email;
 // req.body.firstname = req.user.firstname;
 req.body.email='sonalsawarn00@gmail.com'
 req.body.firstname ='Sonal'
  //Here save all the details in pay object 
   const pay = req.body;
  const hashString = process.env.YOUR_MERCHANT_KEY //store in in different file
   + '|' + pay.txnid
   + '|' + pay.amount 
   + '|' + pay.productinfo 
   + '|' + pay.firstname 
   + '|' + pay.email 
   + '|' + '||||||||||'
   + process.env.YOUR_MERCHANT_SALT //store in in different file
  const sha = new jsSHA('SHA-512', "TEXT");
  sha.update(hashString);
  //Getting hashed value from sha module
   const hash = sha.getHash("HEX");
   
   //We have to additionally pass merchant key to API
   //so remember to include it.
  pay.key = process.env.YOUR_MERCHANT_KEY //store in in different file;
   pay.surl = 'http://localhost:3000/';
   pay.furl = 'http://localhost:3000/roomlist';
   pay.hash = hash;
  //Making an HTTP/HTTPS call with request
  request.post({
   headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json'
   },
   url: 'https://sandboxsecure.payu.in/_payment', //Testing url
   form: pay
   }, function (error, httpRes, body) {
  if (error) 
   res.send(
   {status: false, 
   message:error.toString()
   }
   );
  if (httpRes.statusCode === 200) {
   res.send(body);
   } else if (httpRes.statusCode >= 300 && 
   httpRes.statusCode <= 400) {
   res.redirect(httpRes.headers.location.toString());
   }
   })
  });

  router.post('/payment/success', (req, res) => {
    //Payumoney will send Success Transaction data to req body. 
     //Based on the response Implement UI as per you want
     res.send(req.body);
    })
    router.post('/payment/fail', (req, res) => {
      //Payumoney will send Fail Transaction data to req body. 
      // Based on the response Implement UI as per you want
       res.send(req.body);
      });
      router.get('/payumoney', (req, res) => {
        //Payumoney will send Fail Transaction data to req body. 
        // Based on the response Implement UI as per you want
         res.render('payumoneytest');
        })


var nodemailer = require('nodemailer');

router.post('/signUPmail', (req, res ,body) => {
var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,//true
  port: 25,//465
  auth: {
    user: 'sonalkomal1994@gmail.com',
    pass: 'Sonababu1@'
  }, tls: {
    rejectUnauthorized: false
  }
});

var mailOptions = {
  from: '"MTC Rooms" <admin@mtcroom.com>',
  to: req.body.username,
  subject: 'MTC Room Register',
  html: 
   `<div style="color:white; background-color: teal;font-family: cursive;"> <p>Dear ${req.body.firstname} ,</p></br>
  <p>Thank you for choosing  MTC Rooms. Kindly click on below link to confirm you email address in order to complete your registration Process</p>
 <p> <a href= "${req.body.refrenceval}" style="color:white;"><b>Click here</b><a></p> 
 <p>Regards</p>
 <p>MTC Rooms Team</p><div>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    res.send("success");
  }
});
});


/** Lilly routes */

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/Confirmemail' ,(req,res)=>{
  res.render('Cofirmmail');
})

router.get('/home', (req, res) => {
  res.render('homepage');
});

router.get('/about' ,(req,res)=>{
  res.render('about')
})



  router.get('/roomlist', (req, res,body) => {
    console.log("inside")
    roomlist.loadRoomList(req, res,body)
  });

  router.get('/addroomdetails', (req, res ,body) => {
    console.log("inside")
    addRoomDetail.loadaddRoomDetail(req, res, body);
    
  });

  router.get('/signuppage', (req, res) => {
    console.log("inside")
    res.render('signup');
  });

  

  router.get('/updateroomdetail', (req, res,body) => {
    console.log("inside");
    updateroomdetail.loadupdateRoomDetail(req, res, body);
    
  });

  router.get('/roomSearchDetail' ,async(req,res, next)=>{
    console.log('SearchRoomDetail' ,req.query.location)
    let  response= await roomlist.searchRoomdetail(req, res, next);
    console.log("response" ,response);
  console.log("response1");
 res.render('SearchRoomDetail', {
   loadRoomListdata : response
 });
 
  });

 

  router.get('/roomdetail' ,async(req,res, next)=>{
    console.log('SearchRoomDetail' ,req.query.Room_ID)
    let  response= await roomlist.LoadRoomdetailByID(req, res, next);
 
 res.render('roomdetailpage', {
   loadRoomListdata : response
 });
 
  });

router.get('/userProfilelist' ,async(req,res, next)=>{
  let  response= await roomlist.getUserFavandBookVisitlist(req, res, next); 
  let response1 =await roomlist.getUserBookVisitlist(req, res, next); 
  console.log(response);
 res.render('UserRoomlist', {
  loadfavdata : response ,loadbookvisitdata : response1
});

 });

 


  router.post('/updateRoomDetaildata', async (req, res, body) => {
    console.log("check this" , req.body)
   await updateroomdetail.updateRoomDetailData(req, res, body);
   res.send('Success')
  });

  router.post('/addfavorbookvisit', async (req, res, body) => {
    console.log("check this" , req.body)
    let  response= await roomlist.addFavOrBookVisit(req, res, body);
    res.send(response);
  });

  

 
  router.post('/uploadimage', (req, res, next) => {
    console.log('121',req.files);
    console.log("Inside uploadDonationFile route");
    
     var fileDir = path.join(__dirname, 'lib/public');
              var form = new formidable.IncomingForm({ multiples: true});
              files =[];
              fields=[];
              form.on('field', function (field ,value) {
                fields.push([field, value]) 
              })
              form.on('file', function (field ,file) {
                console.log(file.name);
                files.push([field, file]) 
              })

              form.parse(req, function(err, fields, files) {
                console.log('121',req.files);
              });
  console.log('12',req.files);
              form.on('error', function (err) {
                  console.log(err);
                console.log("File size error");
                 return res.status(400).send("ERROR :" + err.error + err);
              });
  
            form.on('end', function(fields, files) {
             // console.log(files.name);
              console.log(files);
              console.log(fields);
            /* Temporary location of our uploaded file */
            var temp_path = this.openedFiles[0].path;
            /* The file name of the uploaded file */
            var file_name = this.openedFiles[0].name;
            var file_name1= this.openedFiles[0];
            console.log(file_name1);
           console.log("file_name",file_name);
         const params = {
              Bucket: 'mtcroom', // pass your bucket name
              Key: file_name, // file will be saved as testBucket/contacts.csv
              Body: JSON.stringify(file_name, null, 2)
              
          };
          s3.upload(params, function(s3Err, data) {
              if (s3Err) throw s3Err
              console.log(`File uploaded successfully at ${data.Location}`)
          });
        });
      });

  // Signup/In Functionality 
  

router.post('/signUPpage', async (req, res, body) => {
  console.log("check this" , req.body)
let response=await signup.signInUser(req, res, body);
 res.send(response);
});
router.post('/LoginInUser', async (req, res, body) => {
  console.log("check this" , req.body)
  let response=await signup.LoginInUser(req, res, body);
 res.send(response);
});

router.post('/activateUseraccount', async (req, res, body) => {
  console.log("check this" , req.body)
 let response=await signup.activateUserAccount(req, res, body);
 res.send(response)
});
router.post('/getUserDetail', async (req, res, body) => {
  console.log("check this" , req.body)
  try{
    
 
  let response=await signup.getUserDetail(req, res, body);
  console.log(response);
  
   req.session.username =response[0].username;
   req.session.userid=response[0].id;
  req.session.firstname=response[0].firstname;
  req.session.role=response[0].roletype;
  console.log(response);
  res.send(response)
}catch(e){
  console.log(e)
  res.status(401).end()
}
   
  // console.log('session',req.session.username);
});

router.get('/getUserData' ,(req,res)=>{
  console.log("in sessiondata")
  let data =[];
  console.log('sessionuserdata',req.session.username);
  if((req.session.username !=undefined) ||( req.session.username != null)){
    data.push(req.session.username );
    data.push(req.session.userid );
    data.push(req.session.firstname );
    data.push(req.session.role);
  }
  else{
    data.push('0');
  }

  res.send(data)
  

})

router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });

});





router.post('/addRoomDetaildata', async (req, res, body) => {
  console.log("check this" , req.body)
 let response=await addRoomDetail.addRoomDetaildata(req, res, body);
 res.send(response)
});





router.post('/viewRoomdetail', async (req, res, body) => {

console.log("check this" , req.body)
await roomlist.ViewRoomdetail(req, res, body);

 res.send(res)
});

router.post('/deleteRoomDetail', async (req, res, body) => {

  console.log("check this" , req.body)
 await roomlist.DeleteRoomdetail(req, res, body);
 res.send('Success')
});

//payumoney.................





var storage = multer.memoryStorage({
  destination: function(req, file, callback) {
      callback(null, '');
  }
});
var multipleUpload = multer({ storage: storage }).array('file');
//var upload = multer({ storage: storage }).single('file');
const BUCKET_NAME = 'mtcroom';
const IAM_USER_KEY =  process.env.AWS_ACCESS_KEY;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;
router.post('/upload',multipleUpload, function (req, res) {
const file = req.files;
let s3bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: 'mtcroom'
});
s3bucket.createBucket(function () {
    let Bucket_Path = 'BUCKET_PATH';
    //Where you want to store your file
    var ResponseData = [];
 
file.map((item) => {
    var params = {
      Bucket: 'mtcroom',
      Key: item.originalname,
      Body: item.buffer
};
s3bucket.upload(params, function (err, data) {
      if (err) {
       res.json({ "error": true, "Message": err});
      }else{
          ResponseData.push(data);
          if(ResponseData.length == file.length){
            res.json({ "error": false, "Message": "File Uploaded    SuceesFully", Data: ResponseData});
          }
        }
     });
   });
 });
});




module.exports = router;
