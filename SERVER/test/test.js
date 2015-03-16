var async = require('async')

exports.testAsync = function(test) {
    async.series([
        function() {
            setTimeout(console.log('1'), 3000)
            test.ok(true, '1 ok')
        },
        function() {
            setTimeout(console.log('2'), 1000)
            test.ok(true, '2 ok')
        },
        function() {
            setTimeout(console.log('3'), 2000)
            test.ok(true, '3 ok')
        },
        function() {
            test.done()
        }
    ])
    test.done()
}









