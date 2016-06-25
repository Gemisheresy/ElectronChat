app.factory('userService',['socket',function(socket){
    var user = {
        userName: '',
        id: '',
        newComer: true
    };
    socket.on('connect',function() {
        user.userName = prompt(" what is ur name ");
        user.id = socket.id;
        console.log(user);
        socket.emit('first connect',user);
    });


    return user;
}]);