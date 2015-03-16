var db = require('../db'),
    redis = require('redis')

var Article = function (title, context, date, label) {
    this.title = title
    this.context = context
    this.date = date
    this.label = label || {}
}

module.exports = Article

Article.prototype.save = function (callback) {
    var article = {
        title: this.title,
        context: this.context,
        date: this.date,
        lable: this.lable
    }

    db.lpush('AD_Article', article, function(err, reply) {
        if(err) return callback(err)
        if(reply) callback(null, true)
    })
}











