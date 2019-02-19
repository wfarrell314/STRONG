var express = require('express')
var router = express.Router()
var database = require('C:\\Users\\WadeDesktop\\Documents\\STRONG\\models\\database');

router.post("/log", function (req, res) {
    exeQuery("exec dbo.insertLift '" + req.body.lift + "','" + req.body.weight + "','" + req.body.reps + "','" + req.body.date + "','" + req.session.userId + "'", res)
});

router.post("/history", function (req, res) {
    exeQuery("exec dbo.selectLifts '" + req.session.userId + "','" + req.body.lift + "'", res)
});

function exeQuery (query, res) {
    database.exeQuery(query)
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(404).send({
            message: err
        });
    });
};

module.exports = router;