app.factory('messagesServices',['userService','socket',function(user,socket){

    $('form').submit(function(){
        socket.emit('message',user.userName + ': ' + $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('message',function(msg){
        $('#messages').append($('<li>').text(msg));
    });

    socket.on('messageLogs',function(msg){
        if (user.newComer === true){
            $('#messages').append($('<li>').text(msg));
        }
    });
    return socket;

}])