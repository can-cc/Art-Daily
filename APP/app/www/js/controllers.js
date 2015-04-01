angular.module('starter.controllers', [])

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

