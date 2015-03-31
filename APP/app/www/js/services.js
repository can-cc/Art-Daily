angular.module('starter.services', [])

.service('ArticleManager',function($q, $http, setting, Article) {
    return {
        getPage: function(page) {
            var deferred = $q.defer()

            $http.get('http://' + setting.server_domain + '/article/page/' + page).success(function(data) {
                var articles = []
                for (var i = 0; i < data.rst.length; i++) {
                    articles.push(new Article(data.objects[i]))
                }
                deferred.resolve(articles)
            })

            return deferred.promise
        },
        
        getOne: function(id) {
            var deferred = $q.deferred()
             $http.get(setting.server_damain + '/article/' + id).success(function(data) {
                var article = new Article(data)                
                deferred.resolve(article)
            })

            return deferred.promise
        }
    }
}).factory('Article', function(){
    function Article(data) {
        for (var attr in data) {
            if (data.hasOwnProperty(attr))
                this[attr] = data[attr]
        }
    }
    return Article
})
