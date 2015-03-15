var express = require('express')
var app = express()

//Route
var middleware =require('./routes/middleware')
var home = require('./routes/home')
var admin = require('./routes/admin')
//Route api
var api_article = require('./routes/api_article')

app.use(express.static('www'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(middleware)
app.use('/', home)
//app.use('/admin', admin)
app.use('/article', api_article) 

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
