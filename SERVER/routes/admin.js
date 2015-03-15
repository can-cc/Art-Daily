var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.send('Welcome to Art-Daily server, but you can not do anything.')
})

module.exports = router
