var express = require('express'),
    cors = require('cors'),
    db = require('./db'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    session = require('express-session'),
    setting = require('./setting'),
    RedisStore = require('connect-redis')(session)

app.use(cors())

//Route
var middleware =require('./routes/middleware')
var home = require('./routes/home')
var admin = require('./routes/admin')
//Route api
var api_article = require('./routes/api_article')

app.use(express.static('www'))
app.use('/img', express.static('img'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(session({
    resave: true,
    store: new RedisStore(),
    secret: setting.cookieSecret,
    key: 'esid',
    saveUninitialized:false
}))
app.use(multer({
    dest: './img/',
    rename: function (fieldname, filename) {
        return  Date.now()
    },
    onFileUploadStart: function(file, req, res) {
        //Todo:
        //should use Debug
        //console.log(file.fieldname + ' uploaded to  ' + file.path)
    },
    onFileUploadComplete: function(file, req, res) {
        //console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
}))

app.use(middleware)
app.use('/', home)
app.use('/admin', admin)
app.use('/article', api_article)

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
