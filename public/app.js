
var socket = io();
var user ={};
var usersArray = [];



$('form').submit(function(){
    socket.emit('message',user.userName + ': ' + $('#m').val());
    $('#m').val('');
    return false;
});

// When someone connects
socket.on('connect',function(){
    user.userName = prompt('Enter a username');
    user.id = socket.id;
    socket.emit('first connect',user);
});

// adds users to the users list
socket.on('users',function(sentUser){
    if (!usersArray.includes(sentUser.id)){
        usersArray.push(sentUser.id);
        console.log(usersArray)
        $('#users').append($(`<li id=${sentUser.userName}>`).text(sentUser.userName));
    }
});

// adds messages to the messages
socket.on('message',function(msg){
    $('#messages').append($('<li>').text(msg));
})

// when a user disconnects
socket.on('remove',function(user){
    $(`#${user.userName}`).remove();
})
socket.on('new',function(){
    socket.emit('online',user);
})
var discon = function(){
    socket.emit('left',user);
};

