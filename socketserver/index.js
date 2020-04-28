const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
var connectedClients = {};
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./routes');

const app = express();
app.use(cors());
app.use(router);
const server = http.Server(app);
const io = socketio(server);


io.on('connection', (socket) => {
  // socket.on('join', ({ name, room }, callback) => {
  //   const { error, user } = addUser({ id: socket.id, name, room });
  //   console.log(room,name)
  //   if(error) return callback(error);

  //   socket.join(user.room);

  //   socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
  //   socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

  //   io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

  //   callback();
  // });
  socket.on('user_connected',function(username){
    connectedClients[username] = socket.id;
    console.log(socket.id)
  })
  socket.on('sendPrivateMessage', function (message, from,to) {
    var id = connectedClients[to]
    console.log(id)
    io.to(id).emit('private_message',{message, from,to});//check if from is same user so user doesnt receive their own message
  });
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 4000, () => console.log(`Server has started.`));