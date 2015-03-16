var Admin = require('../models/admin'),
    async = require('async')


var admin = new Admin('foo', 'abc123456')

module.exports = {
    setUp: function (callback) {
        admin.save()
        callback()
    },
    tearDown: function (callback) {
        callback()
    },
    testAdmin: function (test) {
        admin.checkExist(function(exist) {
            if(exist) {
                test.ok(true, 'exist')
            } else {
                test.ok(false, 'not exist')
            }
            test.done()
        })
    }
}


// exports.test_save = function(test) {
//     admin.save()
//     test.ok(true, 'save success')
//     test.done()
// }

// exports.test_check_exist = function(test) {
   
// }

// exports.testAdmin = function(test) {
   
    
//     async.series([
//         function(callback){
//             admin.save()
//             callback(null, null)
//         },
//         function(callback){
            
//         },
//         function(callback){
//             Admin.get(test_admin.admin_name, function(err, passwd) {
//                 callback(err, passwd)
//             })
//         }
//     ], function(err, results){
//         if (results[1]) {
//             test.ok(true, 'Admin save and checkExist success!')
//         } else {
//             test.ok(false, 'Admin save and checkExist fail!')
//         }
//         console.log(results[2])
//         test.equal(results[2].passwd, test_admin.passwd, ['checking passwd in database'])
//         test.done()
//     })
    
    
    
// }










