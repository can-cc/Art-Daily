angular.module('starter.controllers', [])

.controller('DDatailCtrl', function($scope, $stateParams, ArticleManager) {
    console.log('haha')
    ArticleManager.getOne($stateParams.DailyId).then(function(article){
        $scope.article = article
    })
})

.controller('DailyCtrl', function($scope, ArticleManager) {

    ArticleManager.getPage(1).then(function(articles){
        $scope.articles = articles
        console.log(articles)
    })
    
    $scope.refresh = function(){
        
    }
    $scope.next = function(){
        
    }
})

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    }
   
})
