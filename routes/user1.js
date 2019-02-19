var express = require('express');
var app = express();
var router = express.Router();
var database = require('C:\\Users\\WadeDesktop\\Documents\\STRONG\\models\\database');
var bcrypt = require('bcrypt');

router.get("/createAccount", function (req, res) {
    res.sendFile('C:/Users/WadeDesktop/Documents/STRONG/public/createAccount.html');
});

router.get("/login", function (req, res) {
    res.sendFile('C:/Users/WadeDesktop/Documents/STRONG/public/login.html');
});

router.post("/insertUser", function (req, res) {
    let params = {};
    params.email = req.body.email;
    params.password = req.body.password;
    bcrypt.hash(params.password, 10, function (err, hash) {
        if (err) {
            console.log(err);
        } else {
            database.exeQuery("exec dbo.insertuser '" + params.email + "','" + hash + "'")
                .then((data) => {
                    req.session.userId = data.recordset[0].UserID;
                    res.status(200).send({
                        redirect: "/"
                    });
                })
                .catch((err) => {
                    res.status(400).send({
                        message: err
                    });
                });
        };
    });
});

router.post("/checkPassword", function (req, res) {
    let params = {};
    params.email = req.body.email;
    params.password = req.body.password;
    database.exeQuery("exec dbo.login '" + params.email + "'")
        .then((data) => {
            bcrypt.compare(params.password, data.recordset[0].password, function (err, result) {
                if (result) {
                    req.session.userId = data.recordset[0].UserID;
                    res.status(200).send({
                        redirect: "/"
                    });
                } else {
                    res.status(400).send();
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send();
        });
});



module.exports = router;