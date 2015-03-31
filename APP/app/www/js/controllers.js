angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, setting, ArticleManager) {
    console.log(setting)
    ArticleManager.getPage(1).then(function(articles){
        console.log(articles)
    })
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
}).controller('Articles', function($scope){
    
});
