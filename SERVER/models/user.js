var mongodb = require('../db')

function User(user) {
    this.name = user.name
    this.passwd = user.passwd
    this.focus = user.focus
}

module.exports = User

User.prototype.save = function save(callback) {
    var user = {
        name: this.name,
        passwd: this.passwd,
        focus: this.focus
    }
    mongodb.open(function(err, db) {
        if(err) return callback(err)
        db.collection('users', function(err, collection){
            if(err) {
                mongodb.close()
                return callback(err)
            }
            collection.ensureIndex('name', {unique: true})
            //write into collection
            collection.insert(user, {safe: true}, function(err, user) {
                mongodb.close()
                callback(err, user)
            })
        })
    })
}

User.get = function (username, callback) {
    mongodb.open(function(err, db) {
        if(err) return callback(err)
        db.collection('users', function(err, collection) {
            if(err) {
                mongodb.close()
                callback(err)
            }
            //find user from collection
            collection.findOne({name: username}, function(err, doc) {
                if(doc) {
                    var user = new User(doc)
                    callback(null, user)
                } else {
                    callback(err, null)
                }
            })
        })
    })
}








