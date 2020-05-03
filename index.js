/* eslint-disable linebreak-style */
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const forceSSL = require('express-force-ssl');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const cryptoJs = require('crypto-js');
const http = require("http");

// Importing the express module under the `app` variable
const app = express();

/*  If the user is local development import the .env file, else do not load the
    .env file. Also if production is set start newrelic for monitoring */
if (app.get('env') === 'development') {
  /* eslint-disable global-require */
  require('dotenv').config();
} else if (app.get('env') === 'production') {
  // Force https protocol for any connection
  app.use(forceSSL);
  /* Ensure that the XFPHeader is trusted, otherwise can cause redirect loop */
  app.set('forceSSLOptions', {
    trustXFPHeader: true,
    sslRequireMessage: 'SSL Required.',
  });
} else {
  console.log('Please set your NODE_ENV to either `development` or `production`');
}

// Importing the favicon, remove if you do not have one.
//app.use(favicon(`${__dirname}/lib/public/img/favicon.ico`));

// Added further layer of security

app.use(helmet({
  frameguard: false,
}));

/*
  Once a brwoser receives the HSTS header (Strict Transport Security Header)
  that browser will prevent any communications from being sent over HTTP and will
  instead send all communications over HTTPS for a specificied amount of time.

  The 'maxAge' parameter specified how many seconds after the first comm to use
  HTTPS in seconds, therefore 5184000s represents 60 days.
*/
app.use(helmet.hsts({
  maxAge: 5184000,
}));

// Importing all routes to the server
const authenticatedRoutes = require('./lib/routes/authenticated-routes');

// Configure the express app
app.use(morgan('combined'));
// app.use(bodyParser.json());
/* app.use(bodyParser.urlencoded({
  extended: false,
})); */
// Register middleware that parses the request payload.

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());

// compress all routes
app.use(compression());

// view engine setup and public static directory
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'lib/public')));
app.use(bodyParser.urlencoded({
  extended: false,
}));
// Load authenticated routes
app.use('/', authenticatedRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// development error handler will print stck trace
// To run in development mode set config var NODE_ENV to 'development'
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler. No stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});



// app.set('port', (process.env.PORT || 3000));
// app.listen(app.get('port'), function() {
//     console.log('Server started on port '+app.get('port'));
// });

var server = app.listen(process.env.PORT || 9000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})

module.exports = app;

