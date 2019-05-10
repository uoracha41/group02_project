'use strict'
var mongoose = require('mongoose')
Theatre = mongoose.model('Theatre')

exports.listAllTheatre = function (req, res) {
    Theatre.find({
        theatre: req.params.theatreName
    }, function (err, theatre) {
        if (err) throw err
        res.json(theatre)
    })
}

exports.createATheatre = function (req, res) {
    var newTheatre = new Theatre(req.body)
    newTheatre.save(function (err, theatre) {
        if (err) throw err
        res.json(theatre)
    })
}

exports.updateATheatre = function (req, res) {
    var newTheatre = {}
    newTheatre = req.body
    Theatre.findByIdAndUpdate(req.params.theatreId, newTheatre, {
        new: true
    }, function (err, theatre) {
        if (err) throw err
        res.json(theatre)
    })
}

function getround(user, i) {
    if (i == 0) {
        return user.round1
    } else if (i == 1) {
        return user.round2
    } else if (i == 2) {
        return user.round3
    } else if (i == 3) {
        return user.round4
    } else if (i == 4) {
        return user.round5
    }
}

function getsess(user, i) {
    if (i == 0) {
        return user.sessSeat1
    } else if (i == 1) {
        return user.sessSeat2
    } else if (i == 2) {
        return user.sessSeat3
    } else if (i == 3) {
        return user.sessSeat4
    } else if (i == 4) {
        return user.sessSeat5
    }
}

exports.Payment = function (req, res) {
    var i = 0
    var max
    var length
    var sess
    Theatre.find({
        theatre: req.params.Theatre
    }, (err, user) => {
        if (err) {
            throw err
        }

        length = (user[0].seat[0].col) * (user[0].seat[0].row.length)
        var resp = {
            seat: [],
            TheatreID: "",
            Username: "",
            Movietitle: "",
            Theatre: "",
            Round: "",
            book: [],
            confirm: false
        }
        max = user[0].showTime.length
        for (i = 0; i < max; i++) {
            if (user[0].showTime[i] === req.params.Round) {
                sess = getsess(user[0].seat[0], i)
                resp.Round = i
            }
        }
        for (var j = 0; j < length; j++) {
            if ((sess[j] == req.params.Username)&&(getround(user[0].booked[0],resp.Round)[j]!=getround(user[0].seat[0],resp.Round)[j])) {
                resp.seat[j] = String(j)
            } else {
                resp.seat[j] = ""
            }
            resp.Username = req.params.Username
            resp.TheatreID = user[0]._id
            resp.Movietitle = user[0].movieName
            resp.book = user[0].booked
            resp.Theatre = user[0].theatre
            resp.confirm = true
        }
        res.end(JSON.stringify(resp))
    })
}

exports.Book = function (req, res) {
    var newData = req.body
    for(let i=0 ;i<req.body.Seat.length;i++){
        if(getround(newData.book[0],req.params.Round)[i]==''){
            getround(newData.book[0],req.params.Round)[i]=req.body.Seat[i]
        }
    }
    var myquery = {theatre:req.params.Theatre}
    var newvalue = {$set:{booked:newData.book}}
    res.end(JSON.stringify(newData))
    var MongoClient = require('mongodb').MongoClient
    var url = 'mongodb://127.0.0.1:27017/'
    MongoClient.connect(url,function(err,db){
        if(err) throw err
        var dbo = db.db("SMcinema")
        dbo.collection("theatres").updateOne(myquery,newvalue,function(err,res){
            if(err) throw err
        })
    })       
}


