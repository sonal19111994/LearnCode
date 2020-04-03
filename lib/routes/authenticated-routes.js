/* eslint-disable linebreak-style */

// Importing the server side modules.
var express = require('express');
var nodemailer = require('nodemailer');
const router = express.Router();
var signup = require('../web/signup');

const fs = require('fs');
//const activity = require('./activity');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sonalkomal1994@gmail.com',
    pass: 'Sonababu1@'
  }
});

var mailOptions = {
  from: 'admin@mtcroom.com',
  to: 'sonalkomal1994@gmail.com ',
  subject: 'MTC Room Register',
  html: '<h1>Welcome</h1><p>you are registered!</p> <a src= "http://localhost:3000/signuppage" >activation link<a>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


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

  router.get('/roomlist', (req, res) => {
    console.log("inside")
    res.render('roomlist');
  });

  router.get('/addroomdetails', (req, res) => {
    console.log("inside")
    res.render('addroomdetail');
  });

  router.get('/signuppage', (req, res) => {
    console.log("inside")
    res.render('signup');
  });

  // Signup/In Functionality 
  router.post('/exportfunctionality', (req, res, next) => {
    signup.signInUser(req, res, next);
  
 
});




module.exports = router;
