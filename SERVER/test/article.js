var assert = require('assert'),
    Article = require('../models/article'),
    time = require('time')

var article_value = {
    title: 'first',
    context: 'this is first!',
    lable: ['first', 'text'],
    date: time.Date()
}

var article = new Article(article_value)

describe('Article', function() {
    describe('#save' , function() {
        it('should return id', function(done) {
            article.save(function (err, id) {
                if(err) throw err
                if(id){
                    article_value.id = id
                    article.id = id
                    done()
                }
            })
        })
    })

    describe('#get_one', function () {
        it('should return article', function (done) {
            Article.get_one(article.id, function (err, reply) {
                if(err) throw err
                if(reply) {
                    assert(article_value, reply)
                    done()
                } else {
                    
                }
            })
        })
    })

    describe('#delete', function () {
        it('it should be delete', function (done) {
            Article.delete(article.id, function (err, reply) {
                if(reply){
                    done()
                } else {
                    throw new Error()
                }
            })
        })
    })
})
