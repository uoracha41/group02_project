'use strict'
module.exports = function (app) {
    var theatreList = require('../controllers/theatreListController')

    app.route('/Theatre')
        .post(theatreList.createATheatre)

    app.route('/Theatre/:theatreName')
        .get(theatreList.listAllTheatre)

    app.route('/Theatre/theatreupdate/:theatreId')
        .post(theatreList.updateATheatre)

    app.route('/payment/:Theatre/:Round/:Username')
        .post(theatreList.Payment)
    
    app.route('/book/:Theatre/:Round')
        .post(theatreList.Book)
}