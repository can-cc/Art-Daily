var assert = require('assert'),
    Article = require('../models/article')

require('date-utils')

var article_value = {
    title: 'first',
    context: 'this is first!',
    lable: ['first', 'text']
}

var article = new Article(article_value)

describe('Article', function() {
    describe('#save' , function() {
        it('should return id', function(done) {
            article.save(function (err, id) {
                if(err) throw err
                if(id){
                    article.id = id
                    done()
                }
            })
        })
    })
})
