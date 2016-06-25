var app = angular.module('chat',[]);
app.controller('main',['userService','$scope',function(user,$scope){
    $scope.discon = function(){
        socket.emit('left',user);

    };
}])

app.controller('usersList',['$scope','onlineServices','userService',function($scope,onlineServices,user){
    $scope.usersArray = []
}]);


app.controller('messages',['$scope','messagesServices','userService',function($scope,messagesServices,user){
}]);