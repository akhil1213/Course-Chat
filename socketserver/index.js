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
  socket.on('user_connected',function(username,usersInfoBecauseOfSocketChange){
    // var connectedClients = {}
    connectedClients[username] = usersInfoBecauseOfSocketChange
    // {//map with username as key and value is json object.
    //   chatters:[],//who's chatting with the client
    //   messages:[],//the messages sent from client and messages users are sending to the client.
    //   socketId:socket.id
    // }
    connectedClients[username].socketId = socket.id
    console.log(connectedClients)
  })
  console.log(connectedClients)
  socket.on('changedChatter',(currentUser) =>{
    io.to(connectedClients[currentUser].socketId).emit('private_message',connectedClients[currentUser])
  })
  socket.on('sendPrivateMessage', function (message, from,to) {
    console.log(from)
    console.log(to)
    console.log(connectedClients)
    var id = connectedClients[to].socketId
    //two if statements making sure everytime a message is sent, no need to add the same chatter to the chatters array.
    //thus fixed a bug where on each message sent, whoever is sending the message, that person keeps getting added to chatters.
    // no duplicate chatters.
    if(connectedClients[to].chatters.findIndex(chatter => chatter == from)== -1) {
      connectedClients[to].chatters.push(from)
    }
    if(connectedClients[from].chatters.findIndex(chatter => chatter == to)==-1){
      connectedClients[from].chatters.push(to)
    }
    connectedClients[from].messages.push({text:message,from:null,to})
    connectedClients[to].messages.push({text:message,from,to:null})
    console.log(from)
    console.log(to)
    console.log(connectedClients[to])
    //if connectedClients[to] is null, then the person the current client is trying to send a message to is offline.
    if(connectedClients[to]!= null)io.to(id).emit('private_message',connectedClients[to]);//check if from is same user so user doesnt receive their own message
    //from is obviously online to send a message so no need to check if online
    io.to(connectedClients[from].socketId).emit('private_message',connectedClients[from]);
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