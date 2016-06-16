//////requirements//////
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var session = require('express-session');


//////auth files///////
var config = require('./config.js');
var passport = require('./svcs/passport.js');
var userCtrl = require('./ctrls/userCtrl.js');


//////other files///////
var expenseCtrl = require('./ctrls/expenseCtrl.js');




/////
var app = express();

var port = config.port;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));

app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());



var mongoUri = config.mongoUri;
mongoose.connect(mongoUri); //default port number to connect to mongoose
//second part says once you open connection one time, it'll consolelog
//you can put url in 'open' area
mongoose.connection.once('open', function(){
  console.log('successfully connected to mongodb');
});


//////////////Endpoints///////////////

//user//
app.post('/api/user', userCtrl.addUser); //makes new user
app.get('/api/user', userCtrl.getUser); //
app.get('/api/getCurrentUser', userCtrl.getCurrentUser);
//current user , goes to user controller, res.send(req.user) sends back current user
    //call endpoint in resolve

//login//
app.post('/api/login', passport.authenticate( 'local-auth', {
  successRedirect: '/api/getCurrentUser'
  }
));
//logout//
app.get('/api/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send("logged out");
});

// USER EXPENSES
app.post( '/api/expenses', expenseCtrl.addExpense );
app.get( '/api/expenses/:id', expenseCtrl.getUserExpenses );
app.delete( '/api/expenses/:id', expenseCtrl.removeExpense );










app.listen(port, function() {
  console.log('now listening at port ' + port);
});
