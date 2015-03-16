var assert = require('assert'),
    Admin = require('../models/admin')

var test_value = {
    admin_name: 'foo',
    passwd: 'abc123456'
}
var admin = new Admin(test_value.admin_name, test_value.passwd)

describe('Admin', function(){
    describe('#save', function(){
        it('should return true when invoke save()', function(done){
            admin.save(done)
        })
    })
    describe('#check_exist', function() {
        it('should return true', function(done) {
            Admin.checkExist(test_value.admin_name, function(err, reply) {
                if(err) throw err
                if(reply) done()
            })
        })
    })
    describe('#check_passwd', function() {
        it('should return true when invoke chekPasswd', function(done) {
            Admin.checkPasswd(test_value.admin_name, test_value.passwd, function(err, reply) {
                if(err) throw err
                if(reply) done()
            })
        })
    })
    describe('delete', function() {
       it('should return true when invoke delete()', function(done) {
           Admin.delete(test_value.admin_name, function(err, reply) {
               if(err) throw err
               console.log(reply)
               if(reply) done()
           })
       })
    })
    
})
