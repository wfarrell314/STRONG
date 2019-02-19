var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
index = require('./routes/index');
user = require('./routes/user');
lifts = require('./routes/lifts');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

app.use(session({
    secret: 'esjfkhskfejhskjfhsekfjh',
    resave: false,
    saveUninitialized: false,
}));

app.use('/', index);
app.use('/user', user);
app.use('/lifts', lifts);

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

 
