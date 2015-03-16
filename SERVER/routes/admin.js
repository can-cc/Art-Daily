var express = require('express'),
    router = express.Router(),
    Admin = require('./modules/admin')


router.get('/', function(req, res) {
  res.send('Welcome to Art-Daily server, but you can not do anything.')
})

router.get('/panel', function(req, res, next) {
  if (req.session.admin) {
    res.render('panel', {
      admin: req.session.admin
    })
  } else res.redirect('/login.html')
})


router.post('/login', function(req, res, next) {
  Admin.checkPasswd(req.body.admin_name, req.body.passwd, function(err, correct) {
    if (correct) {
      req.session.admin = Admin.get(req.body.admin_name, function(admin) {
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

module.exports = router
