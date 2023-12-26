require('dotenv');

const io = require('socket.io')(process.env.PORT || 9000, {
    // cors: { origin: ['http://i-socket.netlify.app:3000'] }
    cors: { origin: ['http://localhost:3000'] }
});

io.on("connection", socket => {
    console.log('Socket connected:', socket.id);

    socket.on('disconnecting', () => {
        console.log(`${socket.id} left room ${socket.rooms[1]}`);
        console.log(socket.rooms);
    })

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });

    socket.on('join-room', room => {
        console.log(`${socket.id} joined room ${room}`);
        socket.join(room);
    });

    socket.on('set-username', async (username, room, callback) => {
        // get usernames of sockets in this room
        const sockets = await io.in(room).fetchSockets();
        const existingUsernames = sockets.map(s => s.data.username);

        if (existingUsernames.find(u => u === username)) {
            // username already exists
            callback(false);
        } else {   
            socket.data.username = username; // store for later use
            callback(true);
        }
    })

    socket.on('send-message', async (room, username, message) => {
        const sockets = await io.in(room).fetchSockets();
        console.log(sockets);
        console.log(`[${room}] ${username} (${socket.id}): ${message}`);
        socket.to(room).emit('load-message', username, message);
    });
}); 