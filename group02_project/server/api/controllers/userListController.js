'use strict'
var mongoose = require('mongoose')
var Account = mongoose.model('Accounts')
var Session = mongoose.model('Sessions')


exports.listAllAccounts = function (req, res) {
    var query = {
        sort: {
            Username: 1
        }
    }
    Account.find({}, null, query, function (err, user) {
        if (err) throw err
        res.json(user)
    })
}

exports.LogIn = function (request, response) {
    var resp = {
        Username: '',
        isAdmin: '',
        confirm: false,
        err: ''
    }
    Account.findOne({
        Username: request.params.Username
    }, (err, user) => {
        if (err) {
            throw err
        }
        if (!user) {
            resp.err = "Please enter a valid username"
        } else if (user) {
            if (!(user.Password === request.params.Password)) {
                resp.err = "Wrong password. Please try again"
            } else {
                resp.Username = user.Username
                resp.isAdmin = user.isAdmin
                resp.confirm = true
                Session.create({
                    "session_id": request.sessionID,
                    "Username": user.Username,
                    "isAdmin": user.isAdmin
                })
            }
        }
        console.log("response ; " + JSON.stringify(resp));
        response.end(JSON.stringify(resp))
    })
}


exports.getSession = function (request, response) {
    var resp = {
        Username: '',
        isAdmin: '',
        confirm: false
    }
    Session.find({
        session_id: request.sessionID
    }, (err, user) => {
        if (err) {
            throw err
        }
        if (user.length == 0) {
            resp.confirm = false
            console.log("user.lrngth==0")
        } else {
            resp.confirm = true
            resp.Username = user[0].Username
            resp.isAdmin = user[0].isAdmin
        }
        response.end(JSON.stringify(resp))
    })
}

exports.LogOut = function (request, response) {
    Session.deleteOne({
        session_id: request.sessionID
    }, function (err, user) {
        response.json(user)
    })
}

exports.listAllSession = function (req, res) {
    var query = {
        sort: {
            Username: 1
        }
    }
    Session.find({}, null, query, function (err, user) {
        if (err) throw err
        res.json(user)
    })
}

exports.createAccount = function (req, res) {
    var resp = {
        error: '',
        confirm: false
    }
    Account.findOne({
        Username: req.body.Username
    }, (err, user) => {
        if (user !== null) {
            resp.confirm = false
            resp.error = "Username duplicated"
        } else {
            var newAccount = new Account(req.body)
            resp.confirm = true
            newAccount.save(function (err, user) {
                if (err) throw err
            })
        }
        res.end(JSON.stringify(resp))
    })
}