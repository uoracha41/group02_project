var express = require('express')
var cors = require('cors');
var session = require('express-session')
var cookieParser = require('cookie-parser')


app = express()
port = process.env.PORT || 3001
mongoose = require('mongoose')
Movie = require('./api/models/movieListModel')
Theatre = require('./api/models/theatreListModel')
Account = require('./api/models/userListModel')
Session = require('./api/models/sessionListModel')

bodyParser = require('body-parser')
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/SMcinema', function(error){
    if(error) throw error
    console.log('Successfully connected');
})

app.use(cors())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(cookieParser())

// app.use(cors({
//     origin:['http://localhost:8080','http://localhost:3000',],
//     methods:['POST','GET'],
//     credentials: true,
// }));

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

var routess = require('./api/routes/theatreListRoutes')
var routes = require('./api/routes/movieListRoutes')
var route = require('./api/routes/userListRoutes')

route(app)
routes(app)
routess(app)

app.listen(port)

console.log('User List started on : '+ port)