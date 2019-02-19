var express = require('express');
var app = express();
var router = express.Router();
var database = require('C://Users//WadeDesktop//Documents//STRONG//models//database');
var user = require('C:/Users/WadeDesktop/Documents/STRONG/controllers/user.js');

router.get("/createAccount", function (req, res) {
    res.sendFile('C:/Users/WadeDesktop/Documents/STRONG/public/createAccount.html');
});

router.get("/login", function (req, res) {
    res.sendFile('C:/Users/WadeDesktop/Documents/STRONG/public/login.html');
});

router.post("/insertUser", function (req, res) {
    user.insertUser(req, res);
});

router.post("/checkPassword", function (req, res) {
    user.login(req, res);
});

module.exports = router;