var async = require('async')

var testAsync = function() {
    async.waterfall([
        function(callback) {
            setTimeout(function() {
                console.log('1')
            }, 1000)
            callback()
        },
        function(callback) {
            setTimeout(function() {
                console.log('2')
            }, 500)
            callback()
        },
        function(callback) {
            setTimeout(function() {
                console.log('3')
            }, 2000)
            callback()
        }
    ])
}

testAsync()
