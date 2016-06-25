app.factory('onlineServices',['userService','socket','$window',function(user,socket,$window){

    socket.on('users',function(sentUser){
        if (!usersArray.includes(sentUser.id)){
            usersArray.push(sentUser.id);
            console.log(usersArray);
            $('#users').append($(`<li id=${sentUser.userName}>`).text(sentUser.userName));
        }
    });

// adds messages to the messages

    socket.on('newComer',function(){
        user.newComer = false;
    });

    socket.on('remove',function(user){
        $(`#${user.userName}`).remove();
    });
    socket.on('new',function(){
        socket.emit('online',user);
    });
    $window.onbeforeunload = function(event){
        socket.emit('left',user);
    }


    return socket;
}]);