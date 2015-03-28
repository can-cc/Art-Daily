var assert = require('assert'),
    request = require('supertest'),
    assert = require('assert')

describe('Admin Route', function() {
    var url = 'http://localhost:3000'

    describe('Post Article', function() {
        it('should return True when post artilce', function(done) {
            var article_raw = {
                title: 'first article',
                cover_src: 'img/haha.jpg',
                context: 'hahahah'
            }
            request(url)
                .post('/admin/article')
                .send(article_raw)
                .end(function(err, res) {
                    if (err) throw err
                    assert.equal(res.status, 200, 'status')
                    done()
                })
        })
    })
})
