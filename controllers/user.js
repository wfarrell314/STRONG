var express = require('express');
var app = express();
var database = require('C://Users//WadeDesktop//Documents//STRONG//models//database');
var bcrypt = require('bcrypt');


module.exports = {

    insertUser: async function (req, res) {
        try {
            let hashResult = await this.encryptString(req.body.password);
            let query = "exec dbo.insertuser '" + req.body.email + "','" + hashResult + "'";
            let queryResult = await this.exeQuery(query);
            this.setUserId(queryResult, req);
            this.setStateRedirectHome(res);
        } catch (err) {
            this.setStateError(res, err);
        }
    },

    login: async function (req, res) {
        try {
            let query = "exec dbo.login '" + req.body.email + "'";
            let data = await this.exeQuery(query);
            let isMatch = await this.compareEncrypted(req.body.password, data.recordset[0].password);
            if (isMatch) {
                this.setUserId(data, req);
                this.setStateRedirectHome(res);
            } else {
                this.setStateError(res, err);
            }
        } catch {
            this.setStateError(res, err);
        }
    },

    exeQuery: async function (query) {
        try {
            result = await database.exeQuery(query)
            return result;
        } catch (err) {
            return err;
        }
    },

    setStateError: function (res, err) {
        res.status(400).send({
            message: err
        });
    },

    setUserId: function (data, req) {
        req.session.userId = data.recordset[0].UserID;
        return req.session.userId;
    },

    setStateRedirectHome: function (res) {
        res.status(200).send({ redirect: "/" });
    },

    encryptString: async function (string) {
        try {
            let hash = await bcrypt.hash(string, 10);
            return hash;
        } catch (err) {
            return err;
        }
    },

    compareEncrypted: async function (enteredString, hash) {
        try {
            let isMatched = await bcrypt.compare(enteredString, hash);
            return isMatched;
        } catch (err) {
            return err;
        }
    }
};


