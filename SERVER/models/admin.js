var db = require('../db'),
    redis = require('redis'),
    bcrypt = require('bcrypt')

var Admin = function(admin_name, passwd) {
    this.admin_name = admin_name
    this.passwd = passwd
}

module.exports = Admin

Admin.prototype.save = function(callback) {
    var admin_name = this.admin_name
    var passwd = this.passwd

    bcrypt.genSalt(10, function(err, salt) {
	if(err) return callback(err)
	bcrypt.hash(passwd, salt, function(err, hash) {
	    //save into redis
	    db.hmset('AD_Admin:' + admin_name,
			   'passwd', hash,
                           'admin_name', admin_name,
			   redis.print)
            callback(null, true)
	})
    })
}

Admin.prototype.checkExist = function(callback) {
	var admin_name = this.admin_name
	db.hgetall('AD_Admin:' + admin_name, function(err, reply) {
		if (reply) callback(true)
		else callback(false)
	});
};

Admin.checkPasswd = function(admin_name, passwd, callback) {
	db.hget('AD_Admin:' + admin_name, 'passwd', function(err, reply) {
		// check passwd from redis, return boolean 
		bcrypt.compare(passwd, reply, function(err, res) {
			callback(res);
		})
	})
}

Admin.get = function(admin_name, callback) {
    db.hgetall('AD_Admin:' + admin_name, function(err, reply) {
        if(err) return callback(err)
        callback(null, reply)
    })
}














