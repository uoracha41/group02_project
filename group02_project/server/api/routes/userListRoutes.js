'use strict'
module.exports = function(app){
    var accountList = require('../controllers/userListController')
    var sessionList = require('../controllers/userListController')

    app.route('/signup') 
        .post(accountList.createAccount)
    
    app.route('/login/:Username/:Password')
        .post(accountList.LogIn)

    app.route('/accounts')
        .get(accountList.listAllAccounts)

    app.route('/getsession')
        .get(sessionList.getSession)

    app.route('/signout')
        .post(sessionList.LogOut)
}