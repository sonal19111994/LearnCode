/* eslint-disable linebreak-style */

// Importing the server side modules.
var express = require('express');
var nodemailer = require('nodemailer');
const router = express.Router();
var signup = require('../web/signup');
var addRoomDetail = require('../web/addRoomDetail');
var updateroomdetail = require('../web/updateroomdetail');

var roomlist = require('../web/roomlist');

const fs = require('fs');
//const activity = require('./activity');

// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'sonalkomal1994@gmail.com',
//     pass: 'Sonababu1@'
//   }
// });

// var mailOptions = {
//   from: 'admin@mtcroom.com',
//   to: 'sonalkomal1994@gmail.com ',
//   subject: 'MTC Room Register',
//   html: '<h1>Welcome</h1><p>you are registered!</p> <a src= "http://localhost:3000/signuppage" >activation link<a>'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });


/** Lilly routes */




router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/home', (req, res) => {
  res.render('homepage');
});

router.get('/roomdetail', (req, res) => {
    console.log("inside")
    res.render('roomdetailpage');
  });

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

  router.post('/updateRoomDetaildata', async (req, res, body) => {
    console.log("check this" , req.body)
   await updateroomdetail.updateRoomDetailData(req, res, body);
   res.send('Success')
  });

  // Signup/In Functionality 
  

router.post('/signUPpage', async (req, res, body) => {
  console.log("check this" , req.body)
 await signup.signInUser(req, res, body);
 res.send('Success');
});
router.post('/LoginInUser', async (req, res, body) => {
  console.log("check this" , req.body)
 await signup.LoginInUser(req, res, body);
 res.send('Success');
});



router.post('/addRoomDetaildata', async (req, res, body) => {
  console.log("check this" , req.body)
 await addRoomDetail.addRoomDetaildata(req, res, body);
 res.send('Success')
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











module.exports = router;
