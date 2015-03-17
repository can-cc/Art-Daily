var db = require('../db'),
    redis = require('redis')

var Article = function (article) {
    this.id = article.id
    this.title = article.title
    this.context = article.context
    this.date = article.date
    this.label = article.label || {}
}

module.exports = Article

Article.gen_id = function (callback) {
    db.incr('article_count', function(err, id) {
        callback(err, id)
    })
}

Article.prototype.save = function (callback) {
    var article = {
        id: this.id,
        title: this.title,
        context: this.context,
        date: this.date,
        lable: this.lable
    }

    db.zadd('AD_Article', article, function(err, reply) {
        if(err) return callback(err)
        if(reply) callback(null, true)
    })
}

// Article.prototype.fill_id = function (id) {
//     this.id = id
// }

Article.get_one = function(id, callback) {
    db.zrangebyscore('AD_Article', id, id, function (err, reply) {
        if(err) return callback(err)
        if(reply) {
            var article = JSON.parse(reply)
            callback(null, new Article(article))
        } else {
            callback(null, null)
        }
    })
}

//range by sorted
Article.get_range = function(start, end, callback) {
    db.zrevrange(start, end, function(err, reply) {
        if(err) callback(err)
        if(reply) {
            callback(null, reply.map(function (article) {
               return new Article(JSON.parse(article))
            }))
        } else {
            callback(null, null)
        }
    })
}

Article.delete = function(id, callback) {
    db.zremrangebyscore('AD_Article', id, id, function(err, reply) {
        if(err) return callback(err)
        if(reply){
            callback(null, true)
        } else {
            callback(null, false)
        }
    })
}












