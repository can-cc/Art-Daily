var Admin = require('../models/admin'),
    async = require('async')

exports.testAdmin = function(test) {
    var test_admin = {
        admin_name: 'foo',
        passwd: 'abc123456'
    }
    var admin = new Admin(test_admin)
    async.series([
        function(){
            admin.save()
        },
        function(){
            admin.checkExist(function(exist) {
                if (exist) {
                    test.ok(true, 'Admin save and checkExist success!')
                } else {
                    test.ok(false, 'Admin save and checkExist fail!')
                }
            })
        },
        function(){
            Admin.get(test_admin.admin_name, function(err, passwd) {
                if(err) test.ok(false, 'Get passwd from db err: ' + err)
                else {
                    console.log(passwd)
                    test.equal(passwd, test_admin.passwd, ['checking passwd in database'])
                    test.done()}
            })
        }
    ])
    
    
    
}










