var express = require('express')
var router = express.Router()

router.get("/", function (req, res) {
    isAuthenticated(req, res);
});

function isAuthenticated(req, res) {
    if (req.session.userId) {
       return res.sendFile('C:/Users/WadeDesktop/Documents/STRONG/public/dashboard.html');
    } 
return res.sendFile('C:/Users/WadeDesktop/Documents/STRONG/public/login.html');
};

module.exports = router;

