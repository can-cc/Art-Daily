var db = require('../db'),
    redis = require('redis'),
    bcrypt = require('bcrypt')

var User = function(username, passwd, focus) {
    this.username = username
    this.passwd = passwd
    this.focus = focus
}

module.exports = User

User.prototype.save = function(callback) {
    var username = this.username
    var passwd = this.passwd
    var focus = this.focus
    
    bcrypt.genSalt(10, function(err, salt) {
	if(err) return callback(err)
	bcrypt.hash(passwd, salt, function(err, hash) {
	    //save into redis
	    db.hmset('AD_User:' + username,
			   'passwd', hash,
                           'username', username,
                           'focus', foucs,
			   redis.print)
            callback(null, true)
	})
    })
}

User.checkExist = function(username, callback) {
	db.hgetall('AD_User:' + username, function(err, reply) {
            if(err) return callback(err, null)
            callback(null, reply)
	});
};

User.checkPasswd = function(username, passwd, callback) {
	db.hget('AD_User:' + username, 'passwd', function(err, reply) {
		// check passwd from redis, return boolean 
		bcrypt.compare(passwd, reply, function(err, res) {
		    callback(err, res);
		})
	})
}

User.get = function(username, callback) {
    db.hgetall('AD_User:' + username, function(err, reply) {
        if(err) return callback(err)
        callback(null, reply)
    })
}


//Todo: you know
User.delete = function(username, callback) {
    db.hdel('AD_User:' + username, 'passwd', 'username', function(err, reply) {
        if(err) return callback(err) 
        callback(null, reply)
    })
}









