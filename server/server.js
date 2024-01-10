const express = require('express');
const http = require('http');
const socket_io = require('socket.io');
require('dotenv').config();

const app = express();

const server = http.createServer(app);
const port = process.env.PORT || 9000;

const io = socket_io(server, {
  cors: {
    origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
  },
});

app.get('/', (req, res) => {
  res.send('OK');
});

server.listen(port, () => {
  console.log('Server listening on port', port);
});

// function to get all sockets in a room
const getSockets = async (room) => await io.in(room).fetchSockets();

// socket.io event listeners
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('disconnecting', async () => {
    const roomsIter = socket.rooms.keys(); // transform set into iterable
    roomsIter.next(); // ID of socket
    const username = socket.data.username; // username of socket
    const room = roomsIter.next().value; // room that socket left

    console.log(`${socket.id} left ${room}`);

    const members = await getSockets(room);

    io.to(room).emit('member-leave', username);
    io.to(room).emit('update-members', members.length - 1);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });

  socket.on('join-room', async (room) => {
    console.log(`${socket.id} joined ${room}`);
    socket.join(room);

    // update new headcount
    const sockets = await getSockets(room);
    io.to(room).emit('update-members', sockets.length);
    io.to(room).emit('member-join', socket.data.username);
  });

  socket.on('request-members', async (room) => {
    const sockets = await getSockets(room);
    io.to(room).emit('update-members', sockets.length);
  });

  socket.on('set-username', async (username, room, callback) => {
    // get usernames of all sockets in this room
    const sockets = await getSockets(room);
    const usernames = sockets.map(s => s.data.username);

    if (usernames.find(u => u === username)) {
      // username already exists
      callback(false);
    } else {
      socket.data.username = username; // store for later use
      callback(true);
    }
  });

  socket.on('send-message', async (room, username, message) => {
    socket.to(room).emit('load-message', username, message);
  });
});
