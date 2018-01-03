var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/index.html', function(req, res){
res.sendFile(__dirname + '/index.html');
});

app.get('/index2.html', function(req, res){
res.sendFile(__dirname + '/index2.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.broadcast.emit('user1');
  socket.broadcast.emit('user2');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('this is 【chat message】: ' + msg);
  });

  socket.on("demoMes2",function(mes){
    console.log("this is 【demoMes2】:",mes);
  });

  socket.on("user1",function(msg){
    io.emit('user2', msg);
  });
  socket.on("user2",function(msg){
    io.emit('user1', msg);
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
