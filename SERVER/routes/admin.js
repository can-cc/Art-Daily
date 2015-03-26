var express = require('express'),
    router = express.Router(),
    Admin = require('../models/admin'),
    setting = require('../setting'),
    Article = require('../models/article')

router.get('/', function(req, res) {
  res.send('Welcome to Art-Daily server, but you can not do anything.')
})



router.post('/login', function(req, res, next) {
  Admin.checkPasswd(req.body.admin_name, req.body.passwd, function(err, correct) {
    if (correct) {
      req.session.admin = Admin.get(req.body.admin_name, function(err, admin) {
        req.session.admin = admin
        res.send({success: 'welcome, login success!'})
      })
    } else {
      res.send({error: 'admin_name or password error!'})
    }
  })
})

router.post('/logout', function(req, res, next) {
  req.session.destroy(function(){
    res.redirect('/login.html')
  })
})

router.post('/ulimg', function(req, res, next) {
    //console.log(req.files);
    var keys = []
    for (var key in req.files) {
        keys.push(key)
    }
    //I only want first element, may be can opti..
    res.send( {src: req.files[keys[0]].path} || {Error: 'unkown!'}) 
    res.end()
})

router.get('/panel', function(req, res, next) {
  if (req.session.admin) {

    Article.get_range(0, setting.page_show, function (err, reply) {
        if (err){ 
            res.status(500).send({err: 'sorry, there is a error!'})
        } else {
            res.render('panel', {
                articles: reply
            })
        }
    })
  } else res.redirect('/admin/login.html')
})

router.get('/editor', function(req, res, next) {
    if (req.session.admin) {
        res.render('editor')
    } else res.redirect('/admin/login.html')
})



module.exports = router
