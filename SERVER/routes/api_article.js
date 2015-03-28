var express = require('express'),
    router = express.Router(),
    Article = require('../models/article'),
    setting = require('../setting')


router.get('/:id', function(req, res) {
    Article.get_one(req.params.id, function(err, reply) {
        if(err) {
            res.status(500).send({err: 'sorry, there is a error!'})
        } else {
            if(reply) {
                res.send(reply)
            } else {
                res.status(404).send({err: 'sorry, not found!'})
            }
        }
    })
})

router.get('/page/:page', function(req, res) {
    var page = req.params.page
    var start = (page - 1) * setting.page_show
    var end = page * setting.page_show
    Article.get_range(start, end, function (err, reply) {
        if (err){ 
            res.status(500).send({err: 'sorry, there is a error!'})
        } else {
            if(reply) {
                res.send({
                    count: reply.length,
                    rst: reply
                })
            } else {
                res.send({
                    count: 0,
                    rst: []
                })
            }
        }
    })
})

router.post('/', function(req, res, next) {
    
})


module.exports = router
