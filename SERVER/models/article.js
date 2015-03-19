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

// Article.gen_id = function (callback) {
//     db.incr('article_count', function(err, id) {
//         callback(err, id)
//     })
// }

Article.prototype.save = function (callback) {
    var article = {
        title: this.title,
        context: this.context,
        date: this.date,
        lable: this.lable
    }
    db.incr('article_count', function (err, id) {
        article['id'] = id
        console.log(article)
        db.zadd('AD_Article', id, JSON.stringify(article), function(err, reply) {
            if(err) return callback(err)
            if(reply) callback(null, id)
            else callback(null, false)
        })
    })
}

// Article.prototype.edit = function(callback) {
//     var article = {
//         id: this.id,
//         title: this.title,
//         context: this.context,
//         date: this.date,
//         lable: this.lable
//     }
// }

// Article.prototype.fill_id = function (id) {
//     this.id = id
// }

Article.get_one = function(id, callback) {
    db.zrangebyscore('AD_Article', id, id, function (err, reply) {
        if(err) return callback(err)
        if(reply.length) {
            var article = JSON.parse(reply)
            callback(null, article)
        } else {
            callback(null, null)
        }
    })
}

//range by sorted
Article.get_range = function(start, end, callback) {
    db.zrevrange('AD_Article', start, end, function(err, reply) {
        if(err) return callback(err)
        if(reply) {
            callback(null, reply.map(function (article) {
               return JSON.parse(article)
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












