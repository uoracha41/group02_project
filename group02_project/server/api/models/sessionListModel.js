'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SessionSchema = new Schema({
    session_id: {
        type: String,
        Required: 'Please enter'
    },
    Username: {
        type: String,
        Required: 'Please enter'
    },
    isAdmin: {
        type: Boolean,
        Required: 'Please enter'
    }
})

module.exports = mongoose.model('Sessions',SessionSchema)