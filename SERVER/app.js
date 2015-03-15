var express = require('express')
var app = express()

//Route
var middleware =require('./router/middleware')
var admin = require('./routes/admin')
//Route api
var api_article = require('./router/api_article)


app.use(express.static('www'))

app.use(middleware)
app.use('/admin', admin)
app.use('/article', api_article) 

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
