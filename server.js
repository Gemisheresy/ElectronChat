const express= require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let msgs = [];
let usersArray = [];
app.use('/public',express.static(`${__dirname}/public`))
app.use('/angular',express.static(`${__dirname}/node_modules/angular`))
app.get('/',function(req,res){
    res.sendFile(`${__dirname}/index.html`);
});


io.on('connection',function(socket) {

    socket.on('userTest',function(){
        io.emit('userEntered')
    })
//when a user connects to the app and returns past messages
    socket.on('first connect',function(user){
        usersArray.push(user);
        socket.broadcast.emit('new');
        io.emit('users',user);
        for (let i = 0; i < msgs.length;i++){
            io.emit('messageLogs',msgs[i])
        }
        io.emit('newComer');
    });


    //when a new message comes in
    socket.on('message', function (msg) {
        io.emit('message',msg);
        msgs.push(msg);
    });
    socket.on('disconnect',function(){
        io.emit('left')
    })

//when a user connects
    socket.on('user',function(user){
        usersArray = [];
        usersArray.push(user);
        usersArray.sort();
        for (let i = 0; i < usersArray.length;i++){
            io.emit('users',usersArray[i]);
        }

    })
    socket.on('left',function(user){
        io.emit('remove',user);
    })
    socket.on('online',function(user){
        io.emit('users',user);
    })


});


http.listen(8080,function(){
    console.log('listening on 8080')
})
