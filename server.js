const express = require('express');
const app = express();
const path = require('path');
const { disconnect } = require('process');
const socket = require('socket.io');

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
}); 

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('join', (user) => {
    console.log('I\'ve got new user:', user )
    users.push(user);
    console.log('My users:', users);
    socket.broadcast.emit('message', {author: 'Chat Bot', content: `${user.nameUser} has joined the conversation!`});
  });
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => { 
    const user = users.find(person => person.id === socket.id);
    const index = users.indexOf(user);
    socket.broadcast.emit('message', {author: 'Chat Bot', content: `${user} has left the conversation... :(`});
    console.log('user', user);
    users.splice(index, 1);
    console.log('Oh, socket ' + socket.id + ' has left');
    console.log('My users:', users);
  });

  console.log('I\'ve added a listener on message and disconnect events \n');
});