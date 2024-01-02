require('dotenv');

const io = require('socket.io')(process.env.PORT || 9000, {
    cors: { origin: ['http://i-socket.netlify.app:3000', 'http://localhost:3000'] }
});

// get all sockets in a room
async function getSockets(room) {
    return await io.in(room).fetchSockets();
}

io.on("connection", socket => {
    console.log('Socket connected:', socket.id);

    socket.on('disconnecting', async () => {
        const roomsIter = socket.rooms.keys(); // transform set into iterable
        roomsIter.next(); // ID of socket
        const username = socket.data.username; // username of socket
        const room = roomsIter.next().value; // room that socket left

        console.log(`${username} (${socket.id}) left room ${room}`);
        
        const members = await getSockets(room);
        
        io.to(room).emit('member-leave', username);
        io.to(room).emit('update-members', members.length-1);
    })

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });

    socket.on('join-room', async room => {
        console.log(`${socket.id} joined room ${room}`);
        socket.join(room);

        // update new headcount
        const sockets = await getSockets(room);
        io.to(room).emit('update-members', sockets.length);
        io.to(room).emit('member-join', socket.data.username);
    });

    socket.on('request-members', async room => {
        const sockets = await getSockets(room);
        io.to(room).emit('update-members', sockets.length);
    })

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
    })

    socket.on('send-message', async (room, username, message) => {
        console.log(`[${room}] ${username} (${socket.id}): ${message}`);
        socket.to(room).emit('load-message', username, message);
    });
}); 